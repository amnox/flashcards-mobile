const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action: ', action)
    const returnValue = next(action)
    console.log("New state is: ", store.getState())
  console.groupEnd()
}

export default logger