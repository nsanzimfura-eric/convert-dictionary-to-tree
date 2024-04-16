import { Graphviz } from "@hpcc-js/wasm";
import { writeFile } from "fs/promises";
import { join } from "path";

export interface DictionaryTreeNode {
  [key: string]: any;
}
//colors used to style the tree svg
const levelColors = [
  { bgColor: "#D5E8D4", borderColor: "#83B467" },
  { bgColor: "#DAE8FC", borderColor: "#7192C2" },
  { bgColor: "#FFF2CC", borderColor: "#D6B656" },
  { bgColor: "#F8CECC", borderColor: "#BD6460" },
  //the most test has 4 levels, but i can define other colors
];

//image constructor
export const constructSVGTreeImage = async (data: DictionaryTreeNode) => {
  const graphviz = await Graphviz.load();
  const rootKey = Object.keys(data)[0];
  const dot = createTreeDataFromDictionary(data, rootKey);
  const svg = await graphviz.dot(dot);

  //create new name using time, every time when this function runs
  const date = new Date();
  const dateString = `treeImage_${date.getMinutes()}_${date.getSeconds()}`;
  const filename = `${dateString}.svg`;
  await saveSvgToFile(svg, join(__dirname, "../trees", filename));
  console.log(
    `SVG has been created and saved as '${filename}' in the './src/trees' directory.`
  );
};

//image data creator
function createTreeDataFromDictionary(
  dictionary: DictionaryTreeNode,
  parentName: string
): string {
  let dotSyntax = `digraph G {\nnode [style="filled", shape="ellipse", fontname="Helvetica"];\n`;

  const parseTree = (node: any, parentNode: string, nodeDepth = 1) => {
    const { bgColor, borderColor } = levelColors[nodeDepth] || {
      bgColor: "white",
      borderColor: "black",
    };

    if (Array.isArray(node)) {
      node.forEach((child) => {
        if (typeof child === "object" && child !== null) {
          Object.entries(child).forEach(([childName, grandChild]) => {
            dotSyntax += `"${parentNode}" -> "${childName}";\n`;
            //root color is always constant of colors
            dotSyntax += `"${parentNode}" [fillcolor="${levelColors[0].bgColor}", color="${levelColors[0].borderColor}", penwidth=1, fontcolor="black"];\n`;
            dotSyntax += `"${childName}" [fillcolor="${bgColor}", color="${borderColor}", penwidth=1, fontcolor="black"];\n`;
            parseTree(grandChild, childName, nodeDepth + 1);
          });
        } else if (typeof child === "string" || typeof child === "number") {
          dotSyntax += `"${parentNode}" -> "${child}"\n`;
          dotSyntax += `"${child}" [fillcolor="${bgColor}", color="${borderColor}", penwidth=1, fontcolor="black"];\n`;
        }
      });
    } else if (typeof node === "object" && node !== null) {
      Object.entries(node).forEach(([key, value]) => {
        dotSyntax += `"${parentNode}" -> "${key}";\n`;
        dotSyntax += `"${key}" [fillcolor="${bgColor}", color="${borderColor}", penwidth=1, fontcolor="black"];\n`;
        parseTree(value, key, nodeDepth + 1);
      });
    }
  };

  parseTree(dictionary[parentName], parentName);
  dotSyntax += `}`;
  return dotSyntax;
}

//save svg to ./trees folder
async function saveSvgToFile(svg: string, filePath: string): Promise<void> {
  try {
    await writeFile(filePath, svg);
  } catch (error) {
    console.error("Error with creating SVG in trees folder", error);
  }
}
