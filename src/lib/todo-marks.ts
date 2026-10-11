import { defineHastPlugin } from 'satteri';
import { splitTodos } from './todo.ts';

const CODE_TAGS = new Set(['code', 'pre']);

/**
 * Sätteri hast plugin: wraps `{{TODO: ...}}` placeholders in Markdown prose in
 * `<mark class="todo">` so unfinished content is impossible to miss. Code
 * blocks and inline code are left alone.
 */
export const todoMarks = defineHastPlugin({
  name: 'todo-marks',
  text(node, ctx) {
    const parts = splitTodos(node.value);
    if (!parts.some((part) => part.todo)) return;
    let p: ReturnType<typeof ctx.parent> = ctx.parent(node);
    while (p) {
      if (p.type === 'element' && CODE_TAGS.has(p.tagName)) return;
      p = p.type === 'root' ? undefined : ctx.parent(p);
    }
    ctx.replaceNode(
      node,
      parts.map(({ value, todo }) =>
        todo
          ? { type: 'element', tagName: 'mark', properties: { className: ['todo'] }, children: [{ type: 'text', value }] }
          : { type: 'text', value },
      ),
    );
  },
});
