import React     from 'react'
import Presenter from '../../../../src/addons/presenter'
import Query     from '../../lib/query'
import Index     from '../views/lists/index'

import { addList, removeList } from '../actions/lists'

class ListIndex extends Presenter {
  register () {
    return {
      addList    : (repo, params) => repo.push(addList, params),
      removeList : (repo, params) => repo.push(removeList, params.id)
    }
  }

  model () {
    return {
      lists  : Query.all('lists'),
      counts : Query.count('lists', 'items', 'list')
    }
  }

  view ({ lists, counts }) {
    return <Index lists={lists} counts={counts} />
  }
}

export default ListIndex
