export default function isEqualObject(obj1 = {}, obj2 = {}) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (const key of obj1Keys) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}
