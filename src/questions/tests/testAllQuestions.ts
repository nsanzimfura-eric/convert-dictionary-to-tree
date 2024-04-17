//This is only for calling the function that creates data;

//QUESTION 1
import {
  DictionaryTreeNode,
  constructSVGTreeImage,
} from "../1_convertDictionaryToTreeImage";
//QUESTION 2 A
import { bottomUpLevelOrderTraversal } from "../2_a_bottomLevelUp";
//QUESTION 2 B
import { bottomUpLevelOrderTraversalWithSkip } from "./../2_b_skipLevelOnUserInput";

//TESTS---

// 0. example given
const exampleGiven: DictionaryTreeNode = {
  root: [
    "rootName",
    { p1: ["p1Name", { sp2: [1, 2], sp3: [3, 4] }] },
    { p2: { ln: [5, 6], rn: "onlyChild" } },
  ],
};
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

/**
 * You will notice used SetTimeOut function here, in order to create time interval difference
 * in these function calls so that I be able to create each svg image fileName with unique name,
 * as I am using seconds to rename those images.
 * Example filename: "image-1655306482.svg",  where '1655306482' represents the Unix timestamp.
 *
 * STEPS TO TEST ----------------------------------------
 *
 * npm run start
 * After images the images are created, head over to the http://localhost:8000/
 * and open and see the images in the browser and view images
 */

const testCreatingTreeImages = () => {
  // TESTS:  0
  // Question 1: -creating tree svg from dictionary
  constructSVGTreeImage(exampleGiven, "1_treeImage");
  // Question 2 a: -- reverse
  const bottomUpLevelOrder = bottomUpLevelOrderTraversal(exampleGiven);
  constructSVGTreeImage(bottomUpLevelOrder, "2a_reversedBottomUp");
  //Question 2 b: reverse with skill input given by the user
  const skipAndReverse = bottomUpLevelOrderTraversalWithSkip(exampleGiven, 1); //skip the first
  constructSVGTreeImage(skipAndReverse, "2b_skipped1_reverse");

  // TESTS:  a

  // setTimeout(() => {
  //   // Question 1: -creating tree svg from dictionary
  //   constructSVGTreeImage(dictionary1);
  //   // Question 2 a: -- reverse
  //   const bottomUpLevelOrder1 = bottomUpLevelOrderTraversal(dictionary1);
  //   constructSVGTreeImage(bottomUpLevelOrder1, "reversedBottomUp");
  //   //Question 2 b: reverse with skill input given by the user
  //   const skipAndReverse1 = bottomUpLevelOrderTraversalWithSkip(dictionary1, 1); //skip the first
  //   constructSVGTreeImage(skipAndReverse1, "skipped1_reverse");
  // }, 1000);

  // // TESTS:  b

  // setTimeout(() => {
  //   // Question 1: -creating tree svg from dictionary
  //   constructSVGTreeImage(dictionary2);
  //   // Question 2 a: -- reverse
  //   const bottomUpLevelOrder2 = bottomUpLevelOrderTraversal(dictionary2);
  //   constructSVGTreeImage(bottomUpLevelOrder2, "reversedBottomUp");
  //   //Question 2 b: reverse with skill input given by the user
  //   const skipAndReverse2 = bottomUpLevelOrderTraversalWithSkip(dictionary2, 1); //skip the first
  //   constructSVGTreeImage(skipAndReverse2, "skipped1_reverse");
  // }, 2000);

  // // TESTS:  c

  // setTimeout(() => {
  //   // Question 1: -creating tree svg from dictionary
  //   constructSVGTreeImage(dictionary3);
  //   // Question 2 a: -- reverse
  //   const bottomUpLevelOrder3 = bottomUpLevelOrderTraversal(dictionary3);
  //   constructSVGTreeImage(bottomUpLevelOrder3, "reversedBottomUp");
  //   //Question 2 b: reverse with skill input given by the user
  //   const skipAndReverse1 = bottomUpLevelOrderTraversalWithSkip(dictionary3, 1); //skip the first
  //   constructSVGTreeImage(skipAndReverse1, "skipped1_reverse");
  // }, 3000);

  // // TESTS:  d - Bonus

  // setTimeout(() => {
  //   // Question 1: -creating tree svg from dictionary
  //   constructSVGTreeImage(dictionary1);
  //   // Question 2 a: -- reverse
  //   const bottomUpLevelOrder4 = bottomUpLevelOrderTraversal(dictionaryBonus4);
  //   constructSVGTreeImage(bottomUpLevelOrder4, "reversedBottomUp");
  //   //Question 2 b: reverse with skill input given by the user
  //   const skipAndReverse4 = bottomUpLevelOrderTraversalWithSkip(
  //     dictionaryBonus4,
  //     1
  //   ); //skip the first
  //   constructSVGTreeImage(skipAndReverse4, "skipped1_reverse");
  // }, 4000);
};

export default testCreatingTreeImages;
