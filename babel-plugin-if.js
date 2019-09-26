module.exports = function ({ types: t }) {
  let ifAttrName = 'if';
  let elseAttrName = 'else';

  // 寻找下一个 JSX 元素
  function findNextNode(path, sibling, key) {
    if (!sibling) return null;
    const nextNode = sibling[key + 1];
    if (!nextNode) return null;
    if (t.isJSXText(nextNode) && !nextNode.value.trim())
      return findNextNode(nextNode, sibling, key + 1);
    return t.isJSXElement(nextNode) ? nextNode : null;
  }

  function getAttribute(element, attrName) {
    const index = element.attributes.findIndex(attr => attr.name && attr.name.name === attrName);
    if (index < 0) return null;
    const attrBinding = element.attributes[index];
    // 不加会导致 TypeError: Cannot read property 'filter' of undefined
    element.attributes = element.attributes.filter(attr => attr !== attrBinding);
    return attrBinding;
  }

  function getAlertnateNode(node) {
    if (!node) return t.nullLiteral();
    const elseAttr = getAttribute(node.openingElement, elseAttrName);
    if (elseAttr) return node;
    return t.nullLiteral();
  }

  function JSXElementVisitor(path) {
    ifAttrName = this.opts && this.opts.ifAttrName || ifAttrName;
    elseAttrName = this.opts && this.opts.elseAttrName || elseAttrName;

    const ifAttr = getAttribute(path.node.openingElement, ifAttrName);

    if (!ifAttr) return;

    const nextNode = findNextNode(path, path.parent.children, path.key);
    // 代替的 JSX 节点
    const alertnateNode = getAlertnateNode(nextNode);
    // 删除原来的 else JSX 节点
    path.parent.children = path.parent.children.filter(node => node !== nextNode);

    path.replaceWith(t.conditionalExpression(
      ifAttr.value.expression,
      path.node,
      alertnateNode
    ))
  }

  return {
    visitor: {
      JSXElement: JSXElementVisitor
    }
  };
};
