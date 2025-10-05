type StorageItem<T> = {
  value: T
  expiry?: number
}

type StorageValue = string | number | boolean | object | null | undefined

class LocalStorageManager {
  private readonly isAvailable: boolean

  constructor() {
    this.isAvailable = this.checkLocalStorageAvailability()
  }

  /**
   * Проверяет доступность localStorage
   * @returns {boolean} Доступен ли localStorage
   */
  private checkLocalStorageAvailability(): boolean {
    try {
      const test = 'test'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      console.error('LocalStorage не доступен:', e)
      return false
    }
  }

  /**
   * Сохраняет данные в localStorage
   * @param {string} key - Ключ для сохранения
   * @param {T} value - Значение для сохранения
   * @returns {boolean} Успешно ли сохранение
   */
  setItem<T extends StorageValue>(key: string, value: T): boolean {
    if (!this.isAvailable) return false

    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
      return true
    } catch (e) {
      console.error(`Ошибка при сохранении ключа "${key}":`, e)
      return false
    }
  }

  /**
   * Получает данные из localStorage
   * @param {string} key - Ключ для получения
   * @param {T} defaultValue - Значение по умолчанию, если ключ не найден
   * @returns {T} Полученное значение или значение по умолчанию
   */
  getItem<T extends StorageValue>(
    key: string,
    defaultValue: T | null = null
  ): T | null {
    if (!this.isAvailable) return defaultValue

    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue

      return JSON.parse(item) as T
    } catch (e) {
      console.error(`Ошибка при получении ключа "${key}":`, e)
      return defaultValue
    }
  }

  /**
   * Удаляет данные из localStorage
   * @param {string} key - Ключ для удаления
   * @returns {boolean} Успешно ли удаление
   */
  removeItem(key: string): boolean {
    if (!this.isAvailable) return false

    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      console.error(`Ошибка при удалении ключа "${key}":`, e)
      return false
    }
  }

  /**
   * Очищает все данные из localStorage
   * @returns {boolean} Успешно ли очистка
   */
  clear(): boolean {
    if (!this.isAvailable) return false

    try {
      localStorage.clear()
      return true
    } catch (e) {
      console.error('Ошибка при очистке localStorage:', e)
      return false
    }
  }

  /**
   * Получает ключ по индексу
   * @param {number} index - Индекс ключа
   * @returns {string|null} Ключ или null, если не найден
   */
  key(index: number): string | null {
    if (!this.isAvailable) return null

    try {
      return localStorage.key(index)
    } catch (e) {
      console.error(`Ошибка при получении ключа по индексу ${index}:`, e)
      return null
    }
  }

  /**
   * Получает количество элементов в localStorage
   * @returns {number} Количество элементов
   */
  get length(): number {
    if (!this.isAvailable) return 0
    return localStorage.length
  }

  /**
   * Проверяет существование ключа
   * @param {string} key - Ключ для проверки
   * @returns {boolean} Существует ли ключ
   */
  hasItem(key: string): boolean {
    if (!this.isAvailable) return false
    return localStorage.getItem(key) !== null
  }

  /**
   * Получает все ключи из localStorage
   * @returns {string[]} Массив ключей
   */
  getAllKeys(): string[] {
    if (!this.isAvailable) return []

    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) keys.push(key)
    }
    return keys
  }

  /**
   * Получает все данные из localStorage в виде объекта
   * @returns {Record<string, StorageValue>} Объект со всеми данными
   */
  getAllItems(): Record<string, StorageValue> {
    if (!this.isAvailable) return {}

    const items: Record<string, StorageValue> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        try {
          items[key] = this.getItem(key)
        } catch (e) {
          console.error(`Ошибка при получении значения для ключа "${key}":`, e)
        }
      }
    }
    return items
  }

  /**
   * Сохраняет данные с временем жизни (TTL)
   * @param {string} key - Ключ для сохранения
   * @param {T} value - Значение для сохранения
   * @param {number} ttl - Время жизни в миллисекундах
   * @returns {boolean} Успешно ли сохранение
   */
  setItemWithTTL<T extends StorageValue>(
    key: string,
    value: T,
    ttl: number
  ): boolean {
    if (!this.isAvailable) return false

    try {
      const item: StorageItem<T> = {
        value: value,
        expiry: Date.now() + ttl,
      }
      return this.setItem(key, item)
    } catch (e) {
      console.error(`Ошибка при сохранении ключа "${key}" с TTL:`, e)
      return false
    }
  }

  /**
   * Получает данные с проверкой TTL
   * @param {string} key - Ключ для получения
   * @param {T} defaultValue - Значение по умолчанию
   * @returns {T} Полученное значение или значение по умолчанию
   */
  getItemWithTTL<T extends StorageValue>(
    key: string,
    defaultValue: T | null = null
  ): T | null {
    if (!this.isAvailable) return defaultValue

    try {
      const item = this.getItem<StorageItem<T>>(key)
      if (item === null) return defaultValue

      // Проверяем TTL
      if (item.expiry && Date.now() > item.expiry) {
        this.removeItem(key)
        return defaultValue
      }

      return item.value
    } catch (e) {
      console.error(`Ошибка при получении ключа "${key}" с TTL:`, e)
      return defaultValue
    }
  }
}

export const storage = new LocalStorageManager()
