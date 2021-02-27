const connectionPool = require('./Database')
const moment = require('moment')
class ModelBase {
    constructor(table) {
        this.connection = connectionPool
        this.table = table
        this.selectStatement = []
        this.whereStatement = []
        this.joinStatement = []
    }
    join(subTable, field1, operator, field2, joinType = "") {
        let join = joinType.length ? `${joinType.toLocaleUpperCase()} JOIN` : "JOIN"
        this.joinStatement.push(`${join} ${subTable} ON ${field1} ${operator} ${field2}`)
        return this
    }
    selectRaw(statement) {
        if (statement.length) {
            this.selectStatement.push(statement)
        }
        return this
    }
    whereRaw(statement) {
        if (statement.length) {
            this.whereStatement.push(statement)
        }
        return this
    }
    where(columnOrArray, operatorOrValue = "", value = "") {
        if (columnOrArray.length) {
            if (Array.isArray(columnOrArray)) {
                columnOrArray.forEach(column => {
                    let whereStatement = `${column[0]}`
                    if (column[2]) {
                        whereStatement += ` ${column[1]} ${column[2]}`
                    } else {
                        whereStatement += ` = ${column[1]}`
                    }
                    this.whereStatement.push(`(${whereStatement})`)
                });
            } else {
                let whereStatement = `${columnOrArray}`
                if (value) {
                    whereStatement += ` ${operatorOrValue} ${value}`
                } else {
                    whereStatement += ` = ${operatorOrValue}`
                }
                this.whereStatement.push(`(${whereStatement})`)
            }
        }
        return this
    }
    create(params) {
        return new Promise((res, rej) => {
            let columns = [], values = []
            const today = moment().format("YYYY-MM-DD HH:mm:SS").toString()
            params.created_at = today
            params.updated_at = today
            console.log({params});
            for (const column in params) {
                columns.push(column)
                values.push(`'${params[column]}'`)
            }
            let query = `INSERT INTO ${this.table} (${columns.join(',')}) VALUES (${values.join(', ')})`
            this.connection.query(query, (err, result, fields) => {
                if (err) return rej(err)
                return res(result)
            })
        })
    }
    get(limit = null, offset = null) {
        return new Promise((res, rej) => {
            let query = [`SELECT ${this.selectStatement.join(", ")} FROM ${this.table}`]
            if (this.joinStatement.length) query.push(this.joinStatement.join(" "))
            if (this.whereStatement.length) {
                query.push("WHERE")
                query.push(this.whereStatement.join(" AND "))
            }
            if (limit) {
                let limitOffset = ""
                limitOffset += `LIMIT ${limit}`
                offset && (limitOffset += `, ${offset}`)
                query.push(limitOffset)
            }
            this.connection.query(query.join(" "), (err, result, fields) => {
                if (err) return rej(err)
                return res(result)
            })
        })
    }
    update() {

    }
    delete() {

    }
    validateParams(param) {
        return !format.test(param)
    }
}
module.exports = ModelBase