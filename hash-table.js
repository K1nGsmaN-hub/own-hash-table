class HashFunction {
    constructor(size = 10) {
        this.itemCount = 0
        this.table = Array(size);
        this.keySets = {}
    }

    _updateItemCount = () => {
        this.itemCount += 1
    }

    _checkForOverflow = () => {
        const ratio = this.itemCount / this.table.length

        if (ratio >= 0.7) {
            this.table = [...this.table, ...Array(this.table.length * 2)]
        }
    }

    setItem = (key, value) => {
        this._checkForOverflow()

        if (this.keySets[key]) {
            return new Error('This key was used!')
        }

        this.keySets[key] = this.itemCount
        this.table[this.itemCount] = value

        this._updateItemCount()
    }

    getIndex = (key) => this.keySets[key]

    getItem = (key) => this.table[this.getIndex(key)]

    getItemByIndex = (index) => this.table[index]
}

const hashTable = new HashFunction(10)