export function sortOnce(items, sortFirst, reverse=true) {
  const sortedItems = items.sort(
    function(a, b) {
      if (a[sortFirst] > b[sortFirst]) {
        return -1
      } else if (a[sortFirst] < b[sortFirst]) {
        return 1
      }
    }
  )
  if (reverse) {
    return sortedItems.reverse()
  } else {
    return sortedItems
  }
}

export function sortTwice(items, sortFirst, sortSecond, reverse=true) {
  const sortedItems = items.sort(
    function(a, b) {
      if (a[sortFirst] > b[sortFirst]) {
        return -1
      } else if (a[sortFirst] < b[sortFirst]) {
        return 1
      }
      if (a[sortSecond] > b[sortSecond]) {
        return -1
      } else if (a[sortSecond] < b[sortSecond]) {
        return 1
      }
    }
  )
  if (reverse) {
    return sortedItems.reverse()
  } else {
    return sortedItems
  }
}