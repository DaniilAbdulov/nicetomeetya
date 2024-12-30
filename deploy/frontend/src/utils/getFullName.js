export const getFullName = (first, last, middle = '') => {
    let result = '';

    if (last) {
        result += last + ' ';
    }

    if (first) {
        result += first + ' ';
    }

    if (middle) {
        result += middle;
    }

    return result;
}