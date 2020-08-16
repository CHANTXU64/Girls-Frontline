//test
function print_array(message, array) {
    let log = "[";
    let length = array.length;
    for (let i = 0; i < length; ++i) {
        if (isNaN(array[i]))
            log += array[i] + ", ";
        else
            log += NumberAutoExact(array[i]) + ", ";
    }
    log = log.slice(0, -2);
    log += "]";
    console.log(message + "\n" + log);
}

function print_a_element_of_a_multidimensional_array(message, array, ...number_D) {
    let length = array.length;
    let newArray = new Array(length);
    for (let i = 0; i < length; ++i) {
        let element = array[i];
        for (let d of number_D) {
            element = element[d];
        }
        newArray[i] = element;
    }
    print_array(message, newArray);
}
//End test
