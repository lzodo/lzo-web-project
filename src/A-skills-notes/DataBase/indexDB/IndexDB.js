class IndexDB {
  db
  storeName
  dbVersion
  constructor(dbName, storeName, dbVersion) {
    /**
     * 创建数据库
     */
    this.dbName = dbName // 数据库名称（自定义）
    this.storeName = storeName // 要操作的表名
    this.dbVersion = dbVersion // 数据库版本号（自定义）

    this.init()
  }
  // 初始化
  async init() {
    // 打开一个数据库并获取其reques对象
    const request = indexedDB.open(this.dbName, this.dbVersion)

    /**
     * 监听事件
     * onerror	会在打开或创建数据库出错时触发
     * onsuccess	会在成功打开或创建数据库时触发
     * onupgradeneeded	则会在数据库版本发生变化时触发
     */

    request.onerror = (event) => {
      console.error('打开数据库失败！', event.target.error)
    }

    request.onsuccess = (event) => {
      // db 是数据库对象，可以简单理解为就是一个数据库，之后数据都是在这个数据库里储存的
      this.db = event.target.result
      console.log('打开数据库成功', this.db)
      // this.businessHandler(this.db, this.storeName)
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      console.log('数据库版本变更时会触发', db.version)
      this.createDataStore(db)
    }
  }

  /**
   * 创建对象仓库（表）
   */
  createDataStore(db) {
    // 创建一个名为 ${ storeName } 数据库对象仓库（创建一个数据表）{ keyPath: "id" } 不用修改
    // storeName 不存在则创建
    if (!db.objectStoreNames.contains(this.storeName)) {
      const objectStore = db.createObjectStore(this.storeName, { keyPath: 'id' })
      // 创建索引（字段）
      objectStore.createIndex('name', 'name', { unique: false })
    }
  }

  /**
   * 添加数据
   * @param {*} data 操作数据
   * @param {*} rule 权限
   */
  addData(data = {}, rule = 'readwrite') {
    const userRequest = this.db.transaction([this.storeName], rule).objectStore(this.storeName).add(data)
    userRequest.onsuccess = (event) => {
      console.log('User 添加成功')
    }
    userRequest.onerror = (event) => {
      console.error('User 添加失败', event.target.error)
    }
  }

  /**
   * 通过 id 查询数据
   * @param {*} id
   * @param {*} rule 权限
   */
  async getData(key, rule = 'readwrite') {
    if (!this.db) {
      await this.init()
    }

    return new Promise((resolve, reject) => {
      // 通过事务（transaction）来打开 ${storeName} 对象仓库,返回可操作的transaction实例
      // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
      const transaction = this.db.transaction([this.storeName], rule)
      // 获取可以进行数据增删改查的objectStore对象
      const objectStore = transaction.objectStore(this.storeName)
      console.log(objectStore, '原型上有各种数据操作方法')
      const userRequest = objectStore.get(key) // 主键

      userRequest.onsuccess = (event) => {
        resolve(event)
      }
      userRequest.onerror = (event) => {
        reject()
      }
    })
  }

  /**
   * 查询所有数据
   * @param {*} rule 权限
   */
  openCursor(rule = 'readwrite') {
    return new Promise((resolve, reject) => {
      const userRequest = this.db.transaction([this.storeName], rule).objectStore(this.storeName).openCursor()
      // 查询成功
      let dataList = []
      userRequest.onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          // 获取数据
          dataList.push(cursor.value)
          cursor.continue()
        } else {
          // 全部遍历完成
          resolve(dataList)
        }
      }
    })
  }

  /**
   * 编辑
   * @param {*} data 操作数据
   * @param {*} rule 权限
   */
  updataData(data, rule = 'readwrite') {
    // 缩写
    const userRequest = this.db.transaction([this.storeName], rule).objectStore(this.storeName).put(data)
    userRequest.onsuccess = (event) => {
      this.getData(data.id).then((event) => {
        console.log(event.target.result, '编辑成功')
      })
    }
    userRequest.onerror = (event) => {
      console.error('编辑失败', event.target.error)
    }
  }
  /**
   * 删除数据
   * @param {*} id
   * @param {*} rule 权限
   */
  deleteData(key, rule = 'readwrite') {
    const userRequest = this.db.transaction([this.storeName], rule).objectStore(this.storeName).delete(key)
    userRequest.onsuccess = (event) => {
      console.log('删除成功')
    }
    userRequest.onerror = (event) => {
      console.error('删除失败', event.target.error)
    }
  }

  // 模拟操作
  businessHandler(db, storeName) {
    // 后期异步数据操作（通过事务 transaction 操作数据）
    setTimeout(() => {
      // 增加数据
      // 要储存的信息
      const user = { id: 666, name: '漩涡鸣人' }
      // =========================

      let userId = 666
      // 【通过id获取 get】
      this.getData(userId).then((event) => {
        if (event.target.result) {
          // 【修改 put】
          this.updataData({ id: userId, name: '漩涡鸣人-put33' })

          // 【删除 delete】
          // this.deleteData(db, storeName, userId);
        } else {
          // 【新增 add】
          this.addData(user)
        }
      })

      //【查询所有数据】
      this.openCursor()
    }, 1000)

    // 功能属性
    setTimeout(() => {
      console.log(db.objectStoreNames, 'db.objectStoreNames 获取数据库中已存在的仓库（表）名')
    }, 2000)
  }
}
