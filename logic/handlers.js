// --- logic/handlers.js ---
import { QUIZ_DATA, CHALLENGE_DATA } from '../data/index.js';
import { currentQuizIndex, currentChallengeIndex, currentChapterId, CHAPTER_TITLES } from './state.js';
import { loadContent, showModeSelection } from '../main.js';

// --- クイズ解答ロジック ---
export function setupQuizListeners() {
    const currentQuiz = QUIZ_DATA[currentQuizIndex]; 
    
    const optionButtons = document.querySelectorAll('.option-button');
    const checkButton = document.getElementById('check-quiz-button');
    const feedbackArea = document.getElementById('quiz-feedback');

    let selectedAnswer = null;

    // --- 選択肢のクリック処理 ---
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (checkButton.disabled) return; 

            optionButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedAnswer = button.textContent.trim(); 
        });
    });

    // --- 解答チェックボタンのクリック処理 ---
    checkButton.addEventListener('click', () => {
        if (!selectedAnswer) {
            feedbackArea.textContent = "回答を選択してください。"; 
            feedbackArea.style.color = '#f39c12'; 
            return;
        }

        checkButton.disabled = true; 
        
        // 正解のチェック
        if (selectedAnswer === currentQuiz.correct_answer) {
            feedbackArea.textContent = "✅ 正解です！素晴らしい！"; 
            feedbackArea.style.color = '#2ecc71'; 
        } else {
            feedbackArea.textContent = `❌ 不正解です。正解は: ${currentQuiz.correct_answer}`; 
            feedbackArea.style.color = '#e74c3c'; 
        }
        
        // すべてのボタンのスタイルを更新
        optionButtons.forEach(button => {
            button.disabled = true; 
            button.classList.remove('selected');

            if (button.textContent.trim() === currentQuiz.correct_answer) {
                button.style.backgroundColor = '#27ae60'; 
            } else if (button.textContent.trim() === selectedAnswer && selectedAnswer !== currentQuiz.correct_answer) {
                button.style.backgroundColor = '#c0392b';
            }
        });

        // 詳細な解説を表示
        const explanationHTML = `<p style="margin-top: 20px; padding: 10px; border: 1px dashed #555; background-color: #333;">
            <strong>詳細な解説:</strong> ${currentQuiz.explanation}
        </p>`; 
        feedbackArea.insertAdjacentHTML('afterend', explanationHTML);
    });
}

// --- 課題解答ロジック (穴埋めA) ---
export function setupChallengeSolveListeners() {
    const startSolveButton = document.getElementById('start-solve-button');
    const backToDescButton = document.getElementById('back-to-desc-button');
    const checkSnippetButton = document.getElementById('check-snippet-button');

    // 課題説明画面 -> 解答画面への遷移
    if (startSolveButton) {
        startSolveButton.addEventListener('click', () => {
            loadContent('challenge', 'solve'); // 'solve' フラグを渡す
        });
    }

    // 解答画面 -> 課題説明画面への遷移
    if (backToDescButton) {
        backToDescButton.addEventListener('click', () => {
            loadContent('challenge', null); 
        });
    }

    // 穴埋め判定ロジック
    if (checkSnippetButton) {
        checkSnippetButton.addEventListener('click', () => {
            const currentChallenge = CHALLENGE_DATA[currentChallengeIndex];
            const userInput = document.getElementById('user-snippet-input').value.trim();
            const correctInput = currentChallenge.correct_snippet.trim();
            const feedbackArea = document.getElementById('check-feedback');

            // ユーザー入力を正規化 (空白文字やセミコロンを削除)
            const normalize = (str) => str.replace(/\s/g, '').replace(/;/g, '');
            const normalizedUser = normalize(userInput);
            const normalizedCorrect = normalize(correctInput);

            if (normalizedUser === normalizedCorrect) {
                feedbackArea.innerHTML = `<span style="color: #2ecc71;">✅ 正解です！素晴らしい！</span>`;
                checkSnippetButton.disabled = true;
            } else {
                feedbackArea.innerHTML = `<span style="color: #e74c3c;">❌ 不正解です。再試行してください。</span>`;
            }
        });
    }
}

// --- 模範解答表示ロジック ---
export function setupChallengeSolutionListener() {
    const solutionButton = document.getElementById('show-solution-button');
    const solutionContainer = document.getElementById('solution-container');
    const solutionCodeElement = document.getElementById('solution-code');
    const currentChallenge = CHALLENGE_DATA[currentChallengeIndex];

    if (solutionButton) {
        solutionButton.addEventListener('click', () => {
            solutionCodeElement.textContent = currentChallenge.solution_code;
            solutionContainer.style.display = 'block';
            solutionButton.disabled = true;
            solutionButton.textContent = "解答表示済み";
        });
    }
}

// --- 章選択ロジック ---
export function setupChapterSelectionListeners() {
    const chapterButtons = document.querySelectorAll('.chapter-button');

    chapterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const chapterId = parseInt(button.dataset.chapterId);
            loadContent('quiz', chapterId);
        });
    });
}

// --- コード実行ロジック (Practice Mode) ---
export function setupPracticeModeListeners() {
    const runButton = document.getElementById('run-button');
    const javaCodeArea = document.getElementById('java-code');
    const outputArea = document.getElementById('output-area');
    
    const API_ENDPOINT = "https://emkc.org/api/v2/piston/execute"; 
    
    if (runButton) {
        runButton.addEventListener('click', () => {
            const code = javaCodeArea.value;
            outputArea.textContent = "RUNNING... (Executing code via external API)";
            runButton.disabled = true; 

            const requestBody = {
                language: "java",
                version: "15.0.2",
                files: [
                    {
                        name: "Main.java",
                        content: code
                    }
                ]
            };

            fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => response.json())
            .then(data => {
                let output = "";
                
                if (data.run && data.run.output) {
                    output = data.run.output;
                } else if (data.compile && data.compile.output) {
                    output = `--- COMPILE ERROR ---\n${data.compile.output}`;
                } else if (data.message) {
                    output = `API Error: ${data.message}`;
                } else {
                    output = `Unknown Error.\n${JSON.stringify(data, null, 2)}`;
                }

                outputArea.textContent = `--- Output ---\n${output}`;
            })
            .catch(error => {
                outputArea.textContent = `Error occurred: Check network connection.\n${error.message}`;
                console.error("API Error:", error);
            })
            .finally(() => {
                runButton.disabled = false;
            });
        });
        
        // 初期のコードのテンプレート
        javaCodeArea.value = 
`public class Main {
    public static void main(String[] args) {
        
        // Your code starts here
        int x = 5;
        int y = 10;
        
        // Use English/ASCII characters for output to ensure stability
        System.out.println("Result: " + (x + y)); 
    }
}`;
    }
}