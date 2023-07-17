import { ElMessage } from 'element-plus'


function successPrompt(message, duration = 1000) {
    ElMessage({
        message,
        type: 'success',
        duration
      })
}

function warningPrompt(message, duration = 1000) {
    ElMessage({
        message,
        type: 'warning',
        duration
      })
}

function messagePrompt(message, duration = 1000) {
    ElMessage({
        message,
        duration
      })
}

function errorPrompt(message, duration = 1000) {
    ElMessage.error({
        message,
        duration
      })
}

export { successPrompt, warningPrompt, messagePrompt, errorPrompt }