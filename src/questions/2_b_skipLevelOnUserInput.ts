import { DictionaryTreeNode } from "./1_convertDictionaryToTreeImage";

export const bottomUpLevelOrderTraversalWithSkip = (
  treeData: DictionaryTreeNode,
  skipLevel: number = 1
): any[] => {
  if (Object.keys(treeData).length === 0) return [];

  let rootNode = Object.keys(treeData)[0];
  let initialNodes = treeData[rootNode];

  let queue: Array<[string, any]> = [];
  initialNodes.forEach((child: any) => {
    if (typeof child === "object" && child !== null) {
      Object.entries(child).forEach(([key, value]) => {
        queue.push([key, value]);
      });
    } else {
      queue.push([child, child]);
    }
  });

  let result: any[][] = [];
  let currentDepth = 0;

  while (queue.length > 0) {
    let levelLength = queue.length;
    let currentLevel: any[] = [];

    for (let i = 0; i < levelLength; i++) {
      let item = queue.shift();
      if (!item) continue;
      let [nodeName, node] = item;

      if (currentDepth !== skipLevel) {
        currentLevel.push(nodeName);
      }

      if (Array.isArray(node)) {
        node.forEach((child) => {
          if (typeof child === "object" && child !== null) {
            Object.entries(child).forEach(([childName, grandChild]) => {
              queue.push([childName, grandChild]);
            });
          } else {
            queue.push([child, child]);
          }
        });
      } else if (typeof node === "object" && node !== null) {
        Object.entries(node).forEach(([key, value]) => {
          queue.push([key, value]);
        });
      }
    }

    if (currentLevel.length > 0 && currentDepth !== skipLevel) {
      result.push(currentLevel);
    }

    currentDepth++;
  }

  return result.reverse();
};
