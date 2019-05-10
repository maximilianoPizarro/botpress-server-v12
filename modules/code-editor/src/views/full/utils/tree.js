import find from 'lodash/find'

const addNode = (tree, folders, flowDesc, data) => {
  for (const folderDesc of folders) {
    let folder = find(tree.children, folderDesc)
    if (!folder) {
      folder = { ...folderDesc, parent: tree, children: [] }
      tree.children.push(folder)
    }
    tree = folder
  }
  tree.children.push({ ...flowDesc, parent: tree, ...data })
}

export const splitPath = flow => {
  const paths = flow.split('/')
  const filename = paths[paths.length - 1]
  const fileFolders = paths.slice(0, paths.length - 1)
  const folders = []
  const currentPath = []

  for (const folder of fileFolders) {
    currentPath.push(folder)
    folders.push({ type: 'folder', name: folder, fullPath: currentPath.join('/') })
  }
  currentPath.push(filename)
  return {
    folders,
    flow: { type: 'file', name: filename, fullPath: currentPath.join('/') }
  }
}

export const buildTree = files => {
  const tree = { type: 'root', fullPath: '', name: '<root>', children: [] }
  files.forEach(fileData => {
    const { folders, flow } = splitPath(fileData.location)
    addNode(tree, folders, flow, {
      data: fileData
    })
  })

  return tree.children
}
