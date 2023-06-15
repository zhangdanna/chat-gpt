<template>
  <div class="chat-container">
    <el-container>
      <el-tabs tab-position="right" @tab-click="handleClick" style="width: 100%;">
        <el-tab-pane label="聊天">
          <el-header>欢迎回来！您想聊些什么？</el-header>
          <el-main>
            <div ref="dialogs">
              <div v-for="(item, index) in dialogs" :key="index">
                <div v-if="item.type === 'question'" class="question-message">
                  <div class="question-message-text">
                    <p>{{ item.text }}</p>
                  </div>
                </div>
                <div v-if="item.type === 'answer'" class="answer-message">
                  <div class="answer-message-text">
                    <p>{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-main>
        </el-tab-pane>
        <el-tab-pane label="画图">
          <el-header>🎉 您的个人画师已上线，随时准备将您的想法变为现实！只需告诉我您的设想——🏖️日落海滩，🌃夜晚城市风景，🐩在田野上奔跑的可爱小狗——我就会创作出令人惊叹，独一无二的杰作，完美地捕捉您的想法🫧。 例如：一个芭蕾舞者在黄昏时在港口跳舞。</el-header>
          <el-main>
            <div ref="dialogs">
              <div v-for="(item, index) in pictureDialogs" :key="index">
                <div v-if="item.type === 'question'" class="question-message">
                  <div class="question-message-text">
                    <p>{{ item.text }}</p>
                  </div>
                </div>
                <div v-if="item.type === 'answer'" class="answer-message">
                  <div class="answer-message-picture">
                    <p>{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-main>
        </el-tab-pane>
      </el-tabs>

      <div class="footer-box">
        <div class="input-box">
          <el-input
            :placeholder="messageHolder"
            :prefix-icon="messageIcon"
            clearable
            v-model="message"
            @keyup.enter.native="sendMessage"
            class="input-in"
            >
          </el-input>
          <div class="send-message">
            <el-tooltip content="发送" placement="left">
              <el-button
                type="text"
                icon="el-icon-position"
                @click="sendMessage"
              ></el-button>
            </el-tooltip>

          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import { baseXHR } from '../utils/request'

export default {
  name: 'Chat',
  data () {
    return {
      dialogs: [],
      pictureDialogs: [],
      message: '',
      messageHolder: '问我问题...',
      messageIcon: 'el-icon-microphone',
      tabLabel: '聊天'
    }
  },
  methods: {
    handleClick (tab) {
      this.message = ''
      const tabLabel = tab.label
      this.tabLabel = tabLabel
      this.messageHolder = tabLabel === '画图' ? '请描述您的创作...' : '问我问题...'
      this.messageIcon = tabLabel === '画图' ? 'el-icon-picture-outline' : 'el-icon-microphone'
    },
    getQAnswer () {
      const question = { type: 'question', text: this.message }
      const answer = { type: 'answer', text: this.getAnswer(this.message) }
      this.dialogs.push(question, answer)
    },
    getPAnswer () {
      const question = { type: 'question', text: this.message }
      const answer = { type: 'answer', text: this.getAnswer(this.message, 'picture') }
      this.pictureDialogs.push(question, answer)
    },
    sendMessage () {
      if (this.message.trim() === '') {
        return
      }

      if (this.tabLabel === '画图') {
        this.getPAnswer()
      } else {
        this.getQAnswer()
      }
    },
    //  图片接口：http://localhost:9000/chatgpt/image? 聊天接口：http://localhost:9000/chatgpt/chat?prompt="
    async getAnswer (question, type) {
      // 根据问题返回答案
      try {
        const url = type === 'picture' ? '/chatgpt/image' : 'chatgpt/chat'
        // const url = type === 'picture' ? '/api/workbench/mhwsystemdesc/list' : '/chatgpt/chat'
        const res = await baseXHR(url, "GET", {prompt: question})
        console.log(123, res)
        if (res) {
          return res.data;
        }
      } catch (e) {
        console.error(e);
      }
      // const res = type === 'picture' ? `${question}` : `您问的是：${question}，这是一个自动回复。`
      // return res
    }
  }
}
</script>
<style scoped>
.chat-container {
  padding: 32px 0 100px;
}
.el-tabs__content {
  padding-bottom: 100px;
}
.footer-box {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  z-index: 501;
  background: #f4f6f8;
  border-top: 1px solid rgba(145,158,171,.05);
}

.input-box {
  width: 100%;
  min-height: 78px;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 8px;
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  position: relative;
}
.input-box .input-in .el-textarea__inner {
  border: none !important;
}
.input-box .send-message {
  text-align: right;
}
.input-box .send-message .el-button {
  padding: 8px 2px 0;
}

.question-message {
  margin-bottom: 16px;
  text-align: right;
}
.question-message-text {
  border-radius: 8px 8px 0;
  background: #6e819c;
  color: #fff;
  text-align: left;
  display: inline-block;
  font-size: 13px;
  box-sizing: border-box;
  padding: 0px 12px;
  max-width: 100%;
}
.answer-message {
  margin-bottom: 16px;
  text-align: left;
}

.answer-message-text {
  border-radius: 8px 8px 8px 0;
  background: #f6f8fa;
  color: #000;
  font-size: 13px;
  box-sizing: border-box;
  padding: 1px 12px;
  max-width: 100%;
}
.answer-message-picture {
  border-radius: 8px 8px 8px 0;
  background: #f6f8fa;
  color: #000;
  font-size: 13px;
  box-sizing: border-box;
  display: inline-block;
  padding: 1px 12px;
  max-width: 100%;
}
</style>
