// const notionUrl = 'https://phase-mice-483.notion.site/Question-10222bebb06e8083986ccef91690316d';
import { NotionAPI } from 'notion-client';
import { config } from './config.js';
import OpenAI from "openai";
import { sign } from 'jsonwebtoken';

const notion = new NotionAPI();

export async function getPageContent(pageId) {
  if (pageId) {
    const recordMap = await notion.getPage(pageId);
    let pageText = '';

    for (const blockId in recordMap.block) {
      const block = recordMap.block[blockId].value;

      
      if (
        block.type === 'text' || 
        block.type === 'paragraph' || 
        block.type === 'header' || 
        block.type === 'sub_header' || 
        block.type === 'sub_sub_header' || 
        block.type === 'bulleted_list' || 
        block.type === 'numbered_list'
      ) {
        const text = block.properties?.title?.map(([text]) => text).join('') || '';
        pageText += text + '. ';
      }
    }

    return pageText;
  }
  return null;
}

const openai = new OpenAI({ apiKey: config.openAiApiKey });
export async function summarizeContent(content, name) {
  if (!content || typeof content !== 'string' || content.trim() === '') {
    return 'Error: The content provided is empty or invalid.';
  }

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return 'Error: The name provided is empty or invalid.';
  }

  const prompt = `Summarize the following content in 300-350 characters: "${content}". Avoid speculation and stick to the provided text. If sections are missing, mention "Please visit the public page for more details."`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a summarization assistant. Your task is to create concise summaries that capture the essence of the original content. Write the summary in the first person, maintaining the voice and perspective of the original author, without adding any extraneous information.'

        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 150
    });

    const summary = response.choices[0].message.content.trim();

    if (summary === '') {
      return 'Error: The model returned an empty response.';
    }

    return summary;
  } catch (error) {
    return `Error: An error occurred while generating the summary. Details: ${error.message}`;
  }
}

export const generateToken = () => {
  return sign({ role: 'tutor' }, config.jwtSecret, { expiresIn: '1d' });
};


