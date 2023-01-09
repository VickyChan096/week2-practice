import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      // ↓加入站點
      apiUrl: 'https://vue3-course-api.hexschool.io',
      // ↓加入個人path
      apiPath: 'vcvue',
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${this.apiUrl}/v2/api/user/check`)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          // ↓驗證失敗轉址回登入頁
        });
    },
    getData() {
      axios
        .get(`${this.apiUrl}/v2/api/${this.apiPath}/admin/products`)
        .then((response) => {
          // ↓將遠端商品資料裝進products裏
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    },
    openProduct(item) {
      // ↓觸發'查看細節'時，將該筆資料裝進tempProduct裏
      this.tempProduct = item;
    }
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin()
  }
}).mount('#app');