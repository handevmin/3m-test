// Vercel API 라우트 - OpenAI API 호출
export default async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // OPTIONS 요청 처리 (CORS preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt, image, imageType } = req.body;

        if (!prompt || !image) {
            return res.status(400).json({ error: 'Missing prompt or image' });
        }

        // 이미지 타입 감지 (기본값: png)
        const detectedType = imageType || (image.startsWith('/9j') ? 'jpeg' : 'png');

        // 환경변수에서 OpenAI API 키 가져오기
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'OpenAI API key not configured' });
        }

        // OpenAI API 호출
        const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [{
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/${detectedType};base64,${image}`,
                                detail: "high"
                            }
                        }
                    ]
                }],
                max_tokens: 1000
            })
        });

        if (!openAIResponse.ok) {
            const errorData = await openAIResponse.json();
            console.error('OpenAI API Error:', errorData);
            return res.status(500).json({ 
                error: `OpenAI API 오류: ${errorData.error?.message || openAIResponse.statusText}` 
            });
        }

        const data = await openAIResponse.json();
        const result = data.choices[0].message.content;

        return res.status(200).json({ result });

    } catch (error) {
        console.error('API Route Error:', error);
        return res.status(500).json({ 
            error: `서버 오류: ${error.message}` 
        });
    }
}

