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
  constructSVGTreeImage(exampleGiven);
  // Question 2 a: -- reverse
  const bottomUpLevelOrder = bottomUpLevelOrderTraversal(exampleGiven);
  constructSVGTreeImage(bottomUpLevelOrder, "reversedBottomUp");

  //Question 2 b: reverse with skill input given by the user
  const skipAndReverse = bottomUpLevelOrderTraversalWithSkip(exampleGiven, 1); //skip the first
  constructSVGTreeImage(skipAndReverse, "skipped1_reverse");

  //   //b.
  //   setTimeout(() => {
  //     constructSVGTreeImage(dictionary1);
  //   }, 1000);

  //   //b.
  //   setTimeout(() => {
  //     constructSVGTreeImage(dictionary2);
  //   }, 2000);

  //   //c.
  //   setTimeout(() => {
  //     constructSVGTreeImage(dictionary3);
  //   }, 3000);

  //   //d. --bonus
  //   setTimeout(() => {
  //     constructSVGTreeImage(dictionaryBonus4);
  //   }, 4000);
};

export default testCreatingTreeImages;
