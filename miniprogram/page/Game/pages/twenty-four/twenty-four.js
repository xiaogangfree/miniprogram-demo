// page/Game/twenty-four.js
// pages/index/index.js
Page({
  data: {
    numbers: [],
    userInput: '',
    buttons: ['+', '-', '*', '/', '(', ')'],
    result: '',
  },

  onLoad() {
    this.refreshNumbers()
  },

  refreshNumbers() {
    // 随机生成四个数字
    const numbers = Array.from({length: 4}, () => Math.floor(Math.random() * 10) + 1)
    this.setData({
      numbers,
      userInput: '',
      result: '',
    })
  },

  inputHandler(e) {
    // 处理用户输入
    this.setData({
      userInput: e.detail.value,
    })
  },

  buttonClick(e) {
    // 处理按钮点击
    const value = e.currentTarget.dataset.value
    this.setData({
      userInput: this.data.userInput + value,
    })
  },

  backspace() {
    // 退格
    this.setData({
      userInput: this.data.userInput.slice(0, -1),
    })
  },

  clear() {
    // 清除所有输入
    this.setData({
      userInput: '',
    })
  },

  submit() {
    // 提交并计算结果
    const userInput = this.data.userInput
    // 进行结果判断，这里需要你实现相关的算法逻辑
    const result = this.checkResult(userInput)
    this.setData({
      result,
    })
  },

  showAnswer() {
    // 显示正确的答案
    const correctAnswer = this.calculateCorrectAnswer()
    this.setData({
      result: `正确答案是：${correctAnswer}`,
    })
  },

  // 这里需要你实现相关的算法逻辑，检查用户输入的表达式是否等于24
  checkResult(expression) {
    // 示例：假设用户输入的表达式是正确的
    console.log('expression', expression)
    return '正确'
  },

  // 这里需要你实现相关的算法逻辑，生成一个等于24的表达式作为正确答案
  calculateCorrectAnswer() {
    // 示例：假设正确答案是 8 * 3
    return '8 * 3 = 24'
  },

  // ---------------中缀表达式转换为逆波兰表达式-----------------
  infixToRPN(infixExpression) {
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    }

    function isOperator(token) {
      return ['+', '-', '*', '/'].includes(token)
    }

    function getPrecedence(operator) {
      return precedence[operator] || 0
    }

    function shuntingYard(tokens) {
      const outputQueue = []
      const operatorStack = []

      tokens.forEach(token => {
        if (!Number.isNaN(parseFloat(token))) {
          // 如果是数字，直接输出到队列
          outputQueue.push(token)
        } else if (isOperator(token)) {
          // 如果是操作符，将操作符按照优先级弹出栈中的元素并输出到队列，再将当前操作符入栈
          while (
            operatorStack.length &&
            getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(token)
          ) {
            outputQueue.push(operatorStack.pop())
          }
          operatorStack.push(token)
        } else if (token === '(') {
          // 如果是左括号，直接入栈
          operatorStack.push(token)
        } else if (token === ')') {
          // 如果是右括号，将栈中的操作符弹出并输出到队列，直到遇到左括号
          while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
            outputQueue.push(operatorStack.pop())
          }
          operatorStack.pop() // 弹出左括号
        }
      })

      // 将栈中剩余的操作符输出到队列
      while (operatorStack.length) {
        outputQueue.push(operatorStack.pop())
      }

      return outputQueue
    }

    // 将输入的中缀表达式转换为标记数组
    const tokens = infixExpression.match(/(?:[0-9.]+|[+\-*/()])/g) || []

    // 使用 shunting yard 算法得到逆波兰表达式
    const rpnExpression = shuntingYard(tokens)

    return rpnExpression
  },

  // 示例
  // const infixExpression = "3 + 4 * ( 2 - 1 ) / 5";
  // const rpnExpression = infixToRPN(infixExpression);
  // console.log(rpnExpression); // 输出 ["3", "4", "2", "1", "-", "*", "5", "/", "+"]
  // -----------逆波兰表达式计算------------------------
  calculateRPN(expression) {
    const stack = []

    for (let i = 0; i < expression.length; i++) {
      const token = expression[i]

      if (!Number.isNaN(parseFloat(token))) {
      // 如果是数字，入栈
        stack.push(parseFloat(token))
      } else {
      // 如果是操作符，弹出栈顶两个元素进行运算，再将结果入栈
        const operand2 = stack.pop()
        const operand1 = stack.pop()

        switch (token) {
          case '+':
            stack.push(operand1 + operand2)
            break
          case '-':
            stack.push(operand1 - operand2)
            break
          case '*':
            stack.push(operand1 * operand2)
            break
          case '/':
            stack.push(operand1 / operand2)
            break
          default:
            break
        // 还可以支持其他操作符
        }
      }
    }
    // 最终结果在栈顶
    return stack[0]
  },

  // 示例
  // const expression = ["3", "4", "5", "*", "+"];
  // const result = calculateRPN(expression);
  // console.log(result); // 输出 23

  // --------------随机生成四个通过运算可以得到24的数字-----------------
  generateFourNumbers() {
    return Array.from({length: 4}, () => Math.floor(Math.random() * 10) + 1)
  },

  generateRandomOperator() {
    const operators = ['+', '-', '*', '/']
    return operators[Math.floor(Math.random() * operators.length)]
  },

  calculate(a, b, operator) {
    switch (operator) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return a / b
      default:
        return 0
    }
  },
  isResult24(numbers) {
    console.log('numbers', numbers)
    const operators = ['+', '-', '*', '/']

    for (let i = 0; i < operators.length; i++) {
      for (let j = 0; j < operators.length; j++) {
        for (let k = 0; k < operators.length; k++) {
          // const expression =
          //   `(${numbers[0]} ${operators[i]} ${numbers[1]}) ${operators[j]} (${numbers[2]} ${operators[k]} ${numbers[3]})`

          // if (eval(expression) === 24) {
          //   return true
          // }
        }
      }
    }

    return false
  },

  findNumbers() {
    const numbers = generateFourNumbers()

    if (isResult24(numbers)) {
      return numbers
    } else {
      return findNumbers() // 递归调用直到找到符合条件的四个数
    }
  },

  // 示例
  // const resultNumbers = findNumbers();
  // console.log(resultNumbers);


  // 访问原函数
  helloWorld() {
    wx.cloud.callContainer({
      config: {
        env: 'prod-6gty1lvze8de75fd'
      },
      path: '/api/count',
      header: {
        'X-WX-SERVICE': 'golang-nmbe'
      },
      method: 'POST',
      data: {
        action: 'inc'
      }
    })
  },

})
