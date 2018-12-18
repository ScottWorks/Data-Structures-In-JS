// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example:

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var addTwoNumbers = function(l1, l2) {
  var currentL1 = l1;
  var currentL2 = l2;

  var head = new ListNode(null);
  var prevNode = new ListNode(0);
  var remainder = null;

  while (currentL1 || currentL2 || remainder) {
    var currL1Val = !currentL1 ? 0 : currentL1.val;
    var currL2Val = !currentL2 ? 0 : currentL2.val;

    var currNode = new ListNode(currL1Val + currL2Val);

    if (remainder) {
      currNode.val++;
      remainder = null;
    }

    if (currNode.val > 9) {
      currNode.val = currNode.val - 10;
      remainder = 1;
    }

    if (head.val === null) {
      head = currNode;
    } else if (!head.next) {
      head.next = currNode;
    } else {
      prevNode.next = currNode;
    }

    prevNode = currNode;

    currentL1 = !currentL1 ? null : currentL1.next;
    currentL2 = !currentL2 ? null : currentL2.next;
  }

  return head;
};
