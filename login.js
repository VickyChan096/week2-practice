// ↓引入Vue
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';

createApp({
  data() {
    return {
      // ↓加入站點
      apiUrl:'https://vue3-course-api.hexschool.io',
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      axios
        // ↓登入帳號api路徑
        .post(`${this.apiUrl}/v2/admin/signin`, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          // ↓寫入 cookie token;expires 設置有效時間
          // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie#示例_3_只执行某事一次
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          // ↓下次再發送axios時，預設會把Authorization的token內容直接加到headers裏面
          // https://github.com/axios/axios#global-axios-defaults
          axios.defaults.headers.common['Authorization'] = token;
          alert('登入成功');
          // ↓轉址去商品頁
          window.location = 'products.html';
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
}).mount('#app');