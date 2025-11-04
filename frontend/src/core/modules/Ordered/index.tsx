const decrement = (index, items, step, page = 1, count = 0) => {

    var new_index = parseInt(index) - step;
    step = parseInt(step);
    index = parseInt(index);

    if (step > 0 && new_index >= 0) {

        var before_items = (new_index != 0 ? items.slice(0, new_index) : []),
            new_items = [].concat([items[index]], items.slice(new_index, index)),
            after_items = (index + 1 < items.length ? items.slice(index + 1, items.length) : []);

        return [].concat(
            before_items,
            new_items,
            after_items
        );

    }

}

const increment = (index, items, step, page = 1, count = 0) => {

    var new_index = parseInt(index) + step;
    step = parseInt(step);
    index = parseInt(index);

    if (step > 0 && new_index >= 0) {

        var before_items = items.slice(0, index),
            new_items = [].concat(items.slice(index + 1, new_index + 1), [items[index]]),
            after_items = (new_index + 1 < items.length ? items.slice(new_index + 1, items.length) : []);

        return [].concat(
            before_items,
            new_items,
            after_items
        );

    }

}

export default (type, index, items, step, page = 1, count = 0) => {

    var result;

    if (items.length > 0) {

        if (type == 'inc') {

            result = increment(index, items, step, page, count)

        } else if (type == 'dec') {

            result = decrement(index, items, step, page, count)

        }

        if (result) {
            items = result
        }

        for (let index in items) {
            for (let subIndex in items[index]) {
                if (subIndex.indexOf('priority') + 1 != 0) {
                    items[index][subIndex] = parseInt(index);
                }
            }
        }

    }

    return items;

}