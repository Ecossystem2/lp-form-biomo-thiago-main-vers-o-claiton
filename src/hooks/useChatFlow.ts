'use client'

import { useState, useCallback, useRef } from 'react'

export interface ChatMessage {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: string
  status?: 'sent' | 'delivered' | 'read'
}

interface UseChatFlowOptions {
  onComplete?: () => void
}

export function useChatFlow(options?: UseChatFlowOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputEnabled, setInputEnabled] = useState(false)
  const messageIdCounter = useRef(0)

  const generateId = () => {
    messageIdCounter.current += 1
    return `msg-${messageIdCounter.current}`
  }

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Add a bot message with typing indicator
  const addBotMessage = useCallback(async (content: string, typingDuration?: number) => {
    setInputEnabled(false)

    // Calculate typing duration based on message length if not provided
    const duration = typingDuration ?? Math.min(400 + content.length * 15, 1200)

    // Show typing indicator
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, duration))
    setIsTyping(false)

    // Add message
    const newMessage: ChatMessage = {
      id: generateId(),
      type: 'bot',
      content,
      timestamp: getCurrentTime()
    }

    setMessages(prev => [...prev, newMessage])

    // Small delay before enabling input
    await new Promise(resolve => setTimeout(resolve, 100))

    return newMessage
  }, [])

  // Add a user message
  const addUserMessage = useCallback((content: string) => {
    const newMessage: ChatMessage = {
      id: generateId(),
      type: 'user',
      content,
      timestamp: getCurrentTime(),
      status: 'read'
    }

    setMessages(prev => [...prev, newMessage])
    return newMessage
  }, [])

  // Send multiple bot messages in sequence
  const sendBotMessages = useCallback(async (
    contents: string[],
    delayBetween: number = 300
  ) => {
    for (let i = 0; i < contents.length; i++) {
      await addBotMessage(contents[i])
      if (i < contents.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayBetween))
      }
    }
  }, [addBotMessage])

  // Enable input (call after bot messages are done)
  const enableInput = useCallback(() => {
    setInputEnabled(true)
  }, [])

  // Disable input
  const disableInput = useCallback(() => {
    setInputEnabled(false)
  }, [])

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([])
    messageIdCounter.current = 0
  }, [])

  // Get all messages
  const getMessages = useCallback(() => messages, [messages])

  return {
    messages,
    isTyping,
    inputEnabled,
    addBotMessage,
    addUserMessage,
    sendBotMessages,
    enableInput,
    disableInput,
    clearMessages,
    getMessages
  }
}
