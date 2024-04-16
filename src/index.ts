import { Graphviz } from "@hpcc-js/wasm";
import { writeFile } from "fs/promises";
import { join } from "path";
interface DictionaryTreeNode {
  [key: string]: any;
}

//image constructor
async function constructSVGTreeImage(data: DictionaryTreeNode) {
  const graphviz = await Graphviz.load();
  const rootKey = Object.keys(data)[0];
  const dot = createTreeDataFromDictionary(data, rootKey);
  const svg = graphviz.dot(dot);

  //create new name using time, every time when this function runs
  const date = new Date();
  const dateString = `treeImage_${date.getMinutes()}_${date.getSeconds()}`;
  const filename = `${dateString}.svg`;
  await saveSvgToFile(svg, join(__dirname, "trees", filename));
  console.log(`SVG has been saved as '${filename}' in the 'trees' directory.`);
}

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
    console.error("Error with creating SVG in trees folder:", error);
  }
}

//TESTS---

//a. Pass subtrees as dictionary
const dictionary1: DictionaryTreeNode = {
  root: [
    {
      p2: { ln: [5, 6], rn: "onlyChild" },
    },
    { p3: { ln2: "leftChild", rn2: "rightChild" } },
  ],
};

//b. Pass subtrees List
const dictionary2: DictionaryTreeNode = {
  root: [1, { secondParent: [2, 3] }, 4],
};

//c. Pass subtrees as str + List[Dict]
const dictionary3: DictionaryTreeNode = {
  root: ["rootName", { p1: "p1Name", sp2: [1, 2], sp3: [3, 4] }],
};

// d. Bonus: Pass subtrees as Dict:
const dictionaryBonus4: DictionaryTreeNode = {
  root: {
    p2: { ln: [5, 6], rn: "onlyChild" },
    p3: { ln2: "leftChild", rn2: "rightChild" },
  },
};

// function call to create tree using these data above
//You will notice used Set-time out here, in order to create time interval difference
//in these function calls so that i be able to create each svg image fileName with different names,
//as I am using seconds to rename those image

// a.
constructSVGTreeImage(dictionary1);

//b.
setTimeout(() => {
  constructSVGTreeImage(dictionary2);
}, 2000);

//c.
setTimeout(() => {
  constructSVGTreeImage(dictionary3);
}, 3000);

//d. --bonus
setTimeout(() => {
  constructSVGTreeImage(dictionaryBonus4);
}, 4000);
