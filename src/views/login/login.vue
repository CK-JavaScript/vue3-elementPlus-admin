<template>
  <div class="login-case">
    <img class="login-ripple" src="../../assets/images/login-ripple.png" alt="" srcset="" />
    <div class="form-case">
      <span class="Hello">Hello !</span>
      <span class="title">欢迎来到 Vue Admin</span>
      <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="100px" style="max-width: 460px">
        <el-form-item label="账号：" prop="username">
          <el-input class="inp" v-model="form.username" clearable autocomplete="new-password" :prefix-icon="User" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input class="inp" v-model="form.password" clearable autocomplete="new-password" type="password" :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item label="验证码：" prop="code">
          <div class="code-case">
            <el-input class="inp" v-model="form.code" clearable autocomplete="new-password" :prefix-icon="CircleCheck" width="100px" />
            <verificationCode @getCode="getCode" :key="verificationCodeKey"></verificationCode>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import verificationCode from "@/components/verificationCode.vue";
import { User, Lock, CircleCheck } from "@element-plus/icons-vue";
import { useUser } from "@/store/user.js";
const ruleFormRef = ref("");
const store = useUser();
const router = useRouter();

onMounted(() => {
  ElMessage({
    message: "请使用用户名为 admin、yonghu1、yonghu2 进行登录测试，来获取不同的权限",
    type: "success",
    duration: 5000,
  });
});

let verificationCodeKey = ref(0);
let trueCode = ref("");

/**
 * @description: 获取正确的验证码值
 * @param {*} code: 正确的验证码
 */
function getCode(code) {
  trueCode.value = code;
}

const form = reactive({
  username: "",
  password: "123456",
  code: "",
});
/**
 * @description: 自定义验证 - 验证账号
 */
function checkName(rule, value, callback) {
  if (value === "") {
    callback(new Error("账号不可为空"));
  } else {
    callback();
  }
}

/**
 * @description: 自定义验证 - 验证验证码
 */
function checkCode(rule, value, callback) {
  if (value === "") {
    callback(new Error("验证码不可为空"));
  } else if (value !== trueCode.value) {
    verificationCodeKey.value++;
    callback(new Error("验证码不正确"));
  } else {
    callback();
  }
}

// form 验证
const rules = reactive({
  username: [{ validator: checkName, required: true, trigger: "blur" }],
  password: [{ required: true, message: "密码不可为空", trigger: "blur" }],
  code: [{ validator: checkCode, required: true }],
});

// 登录
async function login() {
  //通过 ref 的值触发验证
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      const params = {
        username: form.username,
        password: form.password,
      };
      store.userlogin(params).then((res) => {
        router.replace("/home");
      });
    }
  });
}
// 回车键触发登录操作
_hook.useKeyStroke("Enter", login);
</script>

<style lang="scss" scoped>
.login-case {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-ripple {
  position: absolute;
  bottom: 0;
  height: 450px;
  width: 100%;
}
.form-case {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 450px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px #d3d3d3;
  .inp {
    width: 220px;
  }
}
.Hello {
  font-size: 40px;
  margin: 40px 0 20px 43px;
  color: var(--el-color-primary);
}

.title {
  font-weight: 600;
  font-size: 20px;
  margin: 0 0 20px 43px;
  color: var(--el-color-primary);
}
.code-case {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .inp {
    margin-right: 10px;
    width: 110px;
  }
}
</style>
