/**
 * 标准数据格式 : { title, id, children }
 */

function dig(path = '0', level = 3) {
    const list = [];
    for (let i = 0; i < 2; i += 1) {
        const id = `${path}-${i}`;
        const treeNode = {
            title: id,
            id,
        };

        if (level > 0) {
            treeNode.children = dig(id, level - 1);
        }

        list.push(treeNode);

    }
    return list
}

const result = dig()
result.push({
    title: 'disabled',
    id: 'id-disabled',
    disabled: true
})
export const treeData = [{   // 数据 11111 个
    title: 'root',
    id: 'root',
    children: result
}];


function allLeaf() {
    const list = [];
    for (let i = 0; i < 1 * 10000; i += 1) {
        const treeNode = {
            title: i + '',
            id: i + ''
        };
        list.push(treeNode);
    }
    return [
        {
            title: 'root',
            id: 'root',
            children: list
        }
    ];
}

export const leafData = allLeaf()   // 数据 10001 个
