class HashFunction {
    constructor(size = 10) {
        this.itemCount = 0
        this.table = Array(size)
        this.keySets = {}
        this.emptyIndexes = []
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

    _hasItem = (key) => this.keySets[key]

    _saveItem = (key, value, index = this.itemCount) => {
        this.keySets[key] = index
        this.table[index] = value
    }

    setItem = (key, value) => {
        this._checkForOverflow()

        if (this._hasItem(key)) {
            return new Error('This key was used!')
        }

        if (this.emptyIndexes.length > 0) {
            const index = this.emptyIndexes[0]
            this.emptyIndexes.splice(0, 1)

            this._saveItem(key, value, index)
        } else {
            this._saveItem(key, value)

            this._updateItemCount()
        }
    }

    removeItem = (key) => {
        if (!this._hasItem(key)) {
            return new Error('This key is never used!')
        }

        const index = this.getIndex(key)

        delete this.keySets[key]
        this.table[index] = undefined
        this.emptyIndexes.push(index)
    }

    updateItem = (key, value) => {
        if (!this._hasItem(key)) {
            return new Error('This key is never used!')
        }

        this.table[this.getIndex(key)] = value
    }

    getIndex = (key) => this.keySets[key]

    getItem = (key) => this.table[this.getIndex(key)]
}