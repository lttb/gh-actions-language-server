import { createConnection } from 'vscode-languageserver/node'
import { initConnection } from '@actions/languageserver/connection'

createConnection(initConnection())
