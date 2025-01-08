async function main() {
  const { createConnection } = await import('vscode-languageserver/node.js')
  const { initConnection } = await import('@actions/languageserver/connection')

  createConnection(initConnection())
}

main()
