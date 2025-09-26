Category.js/**
* مسیر فایل: src/modules/product/domain/valueObjects/Category.js
* وظیفه: نمایش دسته‌بندی محصول به عنوان یک Value Object
* - قوانین مثل طول نام یا لیست دسته‌های مجاز داخل این کلاس هستند
*/

export default class Category {
   constructor(name) {
       if (!name || name.length < 2) {
           throw new Error('Category name must be at least 2 characters long.');
       }
       this.name = name;
   }
}
