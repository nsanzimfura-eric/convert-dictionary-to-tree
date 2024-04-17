import { DictionaryTreeNode } from "./1_convertDictionaryToTreeImage";

export const bottomUpLevelOrderTraversal = (
  treeData: DictionaryTreeNode
): any[] => {
  const queue: [any, number][] = [[treeData.root, 0]];
  const results: any[][] = [];

  while (queue.length > 0) {
    const dequeued = queue.shift();
    if (!dequeued) continue;
    const [node, level] = dequeued;

    while (results.length <= level) {
      results.push([]);
    }

    if (Array.isArray(node)) {
      for (const item of node) {
        if (typeof item === "string" || typeof item === "number") {
          results[level].push(item);
        } else if (typeof item === "object" && !Array.isArray(item)) {
          for (const [key, value] of Object.entries(item)) {
            queue.push([value, level + 1]);
            results[level].push(key);
          }
        }
      }
    } else if (typeof node === "object" && !Array.isArray(node)) {
      for (const [key, value] of Object.entries(node)) {
        queue.push([value, level + 1]);
        results[level].push(key);
      }
    }
  }

  return results.reverse().filter((layer) => layer.length > 0);
};
