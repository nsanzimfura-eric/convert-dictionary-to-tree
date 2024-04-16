import { Graphviz } from "@hpcc-js/wasm";
import { writeFile } from "fs/promises";
import { join } from "path";

export interface DictionaryTreeNode {
  [key: string]: any;
}

//image constructor
export const constructSVGTreeImage = async (data: DictionaryTreeNode) => {
  const graphviz = await Graphviz.load();
  const rootKey = Object.keys(data)[0];
  const dot = createTreeDataFromDictionary(data, rootKey);
  const svg = graphviz.dot(dot);

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
  let dotSyntax = `digraph G {\n`;
  const parseTree = (node: any, parentNode: string): void => {
    if (Array.isArray(node)) {
      node.forEach((child) => {
        if (typeof child === "object" && child !== null) {
          const childName = Object.keys(child)[0];
          dotSyntax += `"${parentNode}" -> "${childName}";\n`;
          parseTree(child[childName], childName);
        } else if (typeof child === "string" || typeof child === "number") {
          const uniqueId = `${parentNode}_${child}`;
          dotSyntax += `"${parentNode}" -> "${uniqueId}" [label="${child}"];\n`;
        }
      });
    } else if (typeof node === "object" && node !== null) {
      for (const key in node) {
        dotSyntax += `"${parentNode}" -> "${key}";\n`;
        parseTree(node[key], key);
      }
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
