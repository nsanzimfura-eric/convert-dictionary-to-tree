import { DictionaryTreeNode } from "./1_convertDictionaryToTreeImage";

export const bottomUpLevelOrderTraversalWithSkip = (
  treeData: DictionaryTreeNode,
  skipLevel: number = 1
): any[] => {
  if (Object.keys(treeData).length === 0) return [];

  let queue: [string, any][] = [
    [Object.keys(treeData)[0], treeData[Object.keys(treeData)[0]]],
  ];
  let result: any[][] = [];
  let currentDepth = 0;

  while (queue.length > 0) {
    let levelLength = queue.length;
    let currentLevel = [];

    for (let i = 0; i < levelLength; i++) {
      let item = queue.shift();
      if (item === undefined) continue;
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
            queue.push([`${child}`, child]);
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
