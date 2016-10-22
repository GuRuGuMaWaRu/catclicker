//===== Mother-child age difference =====//
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

var ages = ancestry.map(function(person) {
  if (byName[person.mother]) {
  	return person.born - byName[person.mother].born;
  } else {
    return null;
	}
});

console.log(average(ages.filter(function(item){
		if (item !== null) {
	    	return item;
	    };
		});
	);
);

// → 31.2

//===== Flattening =====//
var arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
console.log(arrays.reduce(function(total, current) {
	return total.concat(current);
}));
// → [1, 2, 3, 4, 5, 6]

function plum(a, b) { return a.concat(b); }
arrays.reduce(plum);

arrays.reduce(function(previousValue, currentValue, index, array) {
	return previousValue.concat(currentValue);
});

function arrayToList(arr) {
  if (arr.length === 0) {
  	return null;
  } else {
  	return {
      value: arr.shift(),
      rest: arrayToList(arr)
    };
  }
}

function arrayToList(arr) {
  var list = null;

  for (var i = arr.length - 1; i >= 0; i--) {
    list = {value: arr[i], rest: list};
  }
  return list;
}

function listToArray(list) {
  if (!list) {
  	return [];
  } else {
  	return [list.value].concat(listToArray(list.rest));
  }
}

function listToArray(list) {
  var arr = [];

  for (var node = list; node; node = node.rest) {
    arr.push(node.value);
  }
  return arr;
}

function prepend(val, list) {
  return {
  	value: val,
    rest: list
  };
}

function nth(list, position) {
  if (position === 0) {
    return list.value;
  } else {
  	return nth(list.rest, position - 1);
  }
}

function deepEqual(obj1, obj2) {
  if (typeof obj1 == "object" && typeof obj2 == "object" && obj1 !== null && obj2 !== null) {
    if (obj1.length !== obj2.length) {
      return false;
    } else {
      for (item in obj1) {
      	if (!obj2.hasOwnProperty(item)) {
          return false;
        } else {
          return deepEqual(obj1.item, obj2.item);
        }
      }
    }
  } else {
    return obj1 === obj2;
  }
}

function deepEqual(obj1, obj2) {
  if (typeof obj1 == "object" && typeof obj2 == "object" && obj1 !== null && obj2 !== null) {
    for (item in obj1) {
      if (!obj2.hasOwnProperty(item)) {
        return false;
      } else {
        return deepEqual(obj1[item], obj2[item]);
      }
    }
  } else {
    return obj1 === obj2;
  }
}
