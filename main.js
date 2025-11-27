/**
 * CLA: Code Learning app for beginner
 * Main Application Logic
 */

// ===================================
// 1. データ定義
// ===================================

const CHAPTER_TITLES = [
    "1. オブジェクト生成とメソッド呼び出し",
    "2. クラスの定義",
    "3. 基本的な処理の記述",
    "4. 様々なデータ構造",
    "5. メッセージパッシング・委譲",
    "6. 継承・抽象クラス",
    "7. インタフェース",
    "8. クラス定義に関する諸技術",
    "9. ファイル操作",
    "10. ラムダ式とストリーム"
];

// 課題データ（全17問）
// ※ challenge_code が未定義の場合のフォールバック処理をコード内で実装済み
const CHALLENGE_DATA = [
    {
        id: 1, title: "課題2-1: FiveEvenNumbers", file: "FiveEvenNumbers.java",
        description: "長さ5の `int` 型配列を定義し、0から始まる偶数を格納。",
        keywords: ["配列", "forループ"], hints: "配列サイズは5固定です。",
        solution_code: "public FiveEvenNumbers(){ even = new int[5]; for(int i=0; i<5; i++){ even[i] = i * 2; } }",
        challenge_code: "public FiveEvenNumbers() { even = new int[5]; for (int i=0; i < 5; i++) { even[i] = [SNIPPET_HERE]; } }",
        correct_snippet: "i * 2"
    },
    {
        id: 2, title: "課題2-2: EvenNumbers", file: "EvenNumbers.java",
        description: "引数でサイズを受け取る配列を作成。", keywords: ["可変長配列"], hints: "サイズは引数 size を使います。",
        solution_code: "public EvenNumbers(int size){ even = new int[size]; for(int i=0; i<size;i++){ even[i] = i * 2; } }",
        challenge_code: "public EvenNumbers(int size) { even = new int[size]; for (int i=0; i < size; i++) { even[i] = [SNIPPET_HERE]; } }",
        correct_snippet: "i * 2"
    },
    {
        id: 3, title: "課題2-3: FourNames", file: "FourNames.java",
        description: "文字列配列の操作。範囲外アクセスを防止。", keywords: ["配列", "null"], hints: "範囲外なら null を返します。",
        solution_code: "public String getName(int idx){ if (idx >= 0 && idx < this.names.length) return this.names[idx]; else return null; }",
        challenge_code: "public String getName(int idx) { if (idx >= 0 && idx < names.length) return names[idx]; else return [SNIPPET_HERE]; }",
        correct_snippet: "null"
    },
    {
        id: 4, title: "課題2-4: MaxMinAndSumOfNumbers", file: "MaxMinAndSumOfNumbers.java",
        description: "最大値を求める。", keywords: ["最大値", "比較"], hints: "現在の要素が最大値より大きければ更新。",
        solution_code: "public int max() { if (numbers.length==0) return Integer.MIN_VALUE; int m=numbers[0]; for(int i=1;i<numbers.length;i++) if(numbers[i]>m) m=numbers[i]; return m; }",
        challenge_code: "public int max() { int currentMax = numbers[0]; for (int i = 1; i < numbers.length; i++) { if ([SNIPPET_HERE]) { currentMax = numbers[i]; } } return currentMax; }",
        correct_snippet: "this.numbers[i] > currentMax"
    },
    {
        id: 5, title: "課題5-1: Lectureクラス", file: "Lecture.java",
        description: "isValidDayの実装。", keywords: ["nullチェック"], hints: "dayがnullでないか。",
        solution_code: "public boolean isValidDay() { return this.day != null; }",
        challenge_code: "public boolean isValidDay() { return [SNIPPET_HERE]; }",
        correct_snippet: "this.day != null"
    },
    {
        id: 6, title: "課題5-2: TimeTable", file: "TimeTable.java",
        description: "曜日登録チェック。", keywords: ["containsKey"], hints: "HashMapにキーがあるか。",
        solution_code: "public boolean isDayRegistered(String day) { return timetable.containsKey(day); }",
        challenge_code: "public boolean isDayRegistered (String day) { return [SNIPPET_HERE]; }",
        correct_snippet: "timetable.containsKey(day)"
    },
    {
        id: 7, title: "課題5-3: showLecturesOfRoom", file: "TimeTable.java",
        description: "教室名で検索。", keywords: ["equals"], hints: "文字列比較はequals。",
        solution_code: "if(lec.getRoom().equals(room))",
        challenge_code: "if ([SNIPPET_HERE]) { System.out.println(lec); }",
        correct_snippet: "lec.getRoom().equals(room)"
    },
    // ... 省略せずに17問までループ処理するためのダミーデータ生成 ...
];

// データが足りない場合のフォールバック（エラー防止）
for (let i = CHALLENGE_DATA.length + 1; i <= 17; i++) {
    CHALLENGE_DATA.push({
        id: i, title: `課題 ${i} (準備中)`, file: "Pending.java",
        description: "この課題のデータは準備中です。", keywords: [], hints: "",
        solution_code: "// Coming Soon", challenge_code: "// [SNIPPET_HERE]", correct_snippet: "code"
    });
}

// クイズデータ（54問分の一部抜粋 + 生成）
// ※ 実際は全問記述しますが、ここでは動作確認のため代表的なものを定義し、残りは自動生成で埋めます（エラー回避）
const QUIZ_DATA = [
    { id: 1, topic: "1. オブジェクト生成", question: "変数を定数にするキーワードは？", code_example: "___ int x = 10;", options: ["var", "const", "final", "static"], correct_answer: "final", explanation: "finalです。" },
    { id: 2, topic: "1. オブジェクト生成", question: "小数点以下の数値を扱う型は？", code_example: "___ price = 9.8;", options: ["int", "String", "char", "double"], correct_answer: "double", explanation: "doubleです。" },
    { id: 3, topic: "1. オブジェクト生成", question: "条件分岐「より大きい」は？", code_example: "if (x __ 10)", options: ["<=", ">", "==", "!="], correct_answer: ">", explanation: "> です。" }
];

// エラー回避のため、全章分のダミーデータを追加
CHAPTER_TITLES.forEach((title, idx) => {
    if (idx === 0) return; // Chapter 1は既にある
    QUIZ_DATA.push({
        id: 100 + idx, topic: title, question: `${title} の基礎問題`, 
        code_example: "Test code", options: ["A", "B", "C", "D"], correct_answer: "A", explanation: "解説です。"
    });
});

const REVIEW_DATA = [
    { id: 1, topic: "基本出力", title: "Hello World", code_example: "System.out.println();", explanation: "基本です。" }
];

// ===================================
// 2. 状態管理
// ===================================
let currentQuizIndex = 0;
let currentReviewIndex = 0;
let currentChallengeIndex = 0;
let currentChapterId = null;

// ローカルストレージ保存
function saveProgress() {
    try {
        const progress = { quiz: currentQuizIndex, review: currentReviewIndex, challenge: currentChallengeIndex };
        localStorage.setItem('claAppProgress', JSON.stringify(progress));
    } catch (e) { console.error("Save failed", e); }
}

// ローカルストレージ読み込み
function loadProgress() {
    try {
        const saved = localStorage.getItem('claAppProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            currentQuizIndex = progress.quiz || 0;
            currentReviewIndex = progress.review || 0;
            currentChallengeIndex = progress.challenge || 0;
        }
    } catch (e) { console.error("Load failed", e); }
}

// ===================================
// 3. アプリ初期化
// ===================================
loadProgress();

// イベントリスナーの初期設定（DOM読み込み後）
document.addEventListener('DOMContentLoaded', () => {
    const practiceButton = document.getElementById('mode-practice');
    const quizButton = document.getElementById('mode-quiz');
    const reviewButton = document.getElementById('mode-review');
    const challengeButton = document.getElementById('mode-challenge');

    if (practiceButton) practiceButton.addEventListener('click', () => loadContent('practice'));
    if (quizButton) quizButton.addEventListener('click', () => loadContent('quiz', null));
    if (reviewButton) reviewButton.addEventListener('click', () => loadContent('review'));
    if (challengeButton) challengeButton.addEventListener('click', () => loadContent('challenge'));
});

function showModeSelection() {
    saveProgress();
    window.location.reload();
}

// ===================================
// 4. コンテンツ表示ロジック (Core)
// ===================================

function loadContent(mode, chapterSelection = null) {
    const appContainer = document.getElementById('app-container');
    let contentHTML = '';

    if (mode === 'quiz' && chapterSelection !== null) {
        currentChapterId = chapterSelection;
    }

    switch (mode) {
        case 'practice':
            contentHTML = `
                <h2>コード入力・実行モード</h2>
                <p>Javaコードを入力し、「RUN CODE」を押して実行結果を確認してください。</p>
                <div class="code-area">
                    <textarea id="java-code" placeholder="public class Main { ... }" rows="10"></textarea>
                    <button id="run-button">RUN CODE</button>
                    <pre id="output-area">--- Output ---</pre>
                </div>
                <button class="back-button" id="back-main">← モード選択に戻る</button>
            `;
            break;

        case 'quiz':
            if (chapterSelection === null) {
                // 章選択画面
                const chapterListHTML = CHAPTER_TITLES.map((title, index) => `
                    <button class="chapter-button mode-button" data-chapter-id="${index}" style="background-color: #34495e; margin:5px;">
                        ${title}
                    </button>
                `).join('');
                contentHTML = `
                    <h2>クイズ・章選択</h2>
                    <div class="mode-selection" style="flex-direction: column;">${chapterListHTML}</div>
                    <button class="back-button" id="back-main">← モード選択に戻る</button>
                `;
            } else {
                // クイズ画面
                const targetPrefix = CHAPTER_TITLES[currentChapterId].split('.')[0];
                const chapterQuizzes = QUIZ_DATA.filter(q => q.topic.startsWith(targetPrefix));
                
                // インデックス補正
                let quiz = chapterQuizzes.find(q => q.id === QUIZ_DATA[currentQuizIndex]?.id);
                if (!quiz) {
                    currentQuizIndex = QUIZ_DATA.findIndex(q => q.topic.startsWith(targetPrefix));
                    if (currentQuizIndex === -1) currentQuizIndex = 0;
                    quiz = QUIZ_DATA[currentQuizIndex];
                }

                if (!quiz) {
                    contentHTML = `<p>この章にはまだ問題がありません。</p><button class="back-button" id="back-quiz-select">戻る</button>`;
                } else {
                    const options = quiz.options.map(opt => `<button class="option-button">${opt}</button>`).join('');
                    contentHTML = `
                        <h2>クイズ: ${quiz.topic}</h2>
                        <p class="question">${quiz.question}</p>
                        <pre class="code-example">${quiz.code_example}</pre>
                        <div class="options">${options}</div>
                        <div id="quiz-feedback" style="margin: 15px 0; font-weight: bold;"></div>
                        <button id="check-quiz-button">答えをチェック</button>
                        <div style="margin-top:10px;">
                            <button id="prev-quiz">前へ</button> <button id="next-quiz">次へ</button>
                        </div>
                        <button class="back-button" id="back-quiz-select">← 章選択に戻る</button>
                    `;
                }
            }
            break;

        case 'challenge':
            const challenge = CHALLENGE_DATA[currentChallengeIndex];
            const isSolving = (chapterSelection === 'solve');

            if (!isSolving) {
                // 説明画面
                contentHTML = `
                    <h2>課題: ${challenge.title}</h2>
                    <div class="review-area">
                        <p><strong>ファイル:</strong> ${challenge.file}</p>
                        <p>${challenge.description}</p>
                        <p><strong>ヒント:</strong> ${challenge.hints}</p>
                    </div>
                    <div style="margin-top: 20px;">
                        <button id="start-solve-button" style="background-color:#2ecc71;color:white;padding:10px;">▶ 解答を開始</button>
                        <button id="show-solution-button">模範解答を表示</button>
                    </div>
                    <div style="margin-top: 10px;">
                        <button id="prev-ch">前へ</button> <button id="next-ch">次へ</button>
                    </div>
                    <div id="solution-container" style="display:none; margin-top:10px; text-align:left;">
                        <pre id="solution-code" style="background:#222; color:#fff; padding:10px;"></pre>
                    </div>
                    <button class="back-button" id="back-main">← モード選択に戻る</button>
                `;
            } else {
                // 解答（穴埋め）画面
                // エラー防止：challenge_codeがない場合はダミーを表示
                const rawCode = challenge.challenge_code || "Code not available.";
                const codeHtml = rawCode.replace('[SNIPPET_HERE]', '<input type="text" id="user-input" style="color:black;">');
                
                contentHTML = `
                    <h2>${challenge.title} - 解答</h2>
                    <div class="code-area" style="text-align:left;">
                        <pre>${codeHtml}</pre>
                        <div id="check-feedback"></div>
                    </div>
                    <button id="check-answer-button" style="background:#f39c12;color:white;padding:10px;margin-top:10px;">判定</button>
                    <button class="back-button" id="back-to-desc">← 説明に戻る</button>
                `;
            }
            break;

        case 'review':
            const review = REVIEW_DATA[currentReviewIndex];
            contentHTML = `
                <h2>復習: ${review.title}</h2>
                <pre class="code-example">${review.code_example}</pre>
                <p>${review.explanation}</p>
                <div style="margin-top:10px;">
                    <button id="prev-rev">前へ</button> <button id="next-rev">次へ</button>
                </div>
                <button class="back-button" id="back-main">← モード選択に戻る</button>
            `;
            break;
    }

    appContainer.innerHTML = contentHTML;
    attachDynamicListeners(mode, chapterSelection);
}

// ===================================
// 5. イベントリスナー設定 (動的)
// ===================================
function attachDynamicListeners(mode, selection) {
    // 共通: モード選択に戻る
    const backMain = document.getElementById('back-main');
    if (backMain) backMain.addEventListener('click', showModeSelection);

    // Practice Mode
    if (mode === 'practice') {
        const btn = document.getElementById('run-button');
        if (btn) {
            btn.addEventListener('click', () => {
                const code = document.getElementById('java-code').value;
                const out = document.getElementById('output-area');
                out.textContent = "Running...";
                
                // Piston API
                fetch("https://emkc.org/api/v2/piston/execute", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        language: "java", version: "15.0.2",
                        files: [{ name: "Main.java", content: code }]
                    })
                })
                .then(res => res.json())
                .then(data => {
                    out.textContent = (data.run && data.run.output) ? data.run.output : "Error: " + JSON.stringify(data);
                })
                .catch(e => out.textContent = "Network Error");
            });
            
            // 初期コード
            document.getElementById('java-code').value = `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Result: " + (5+10));\n    }\n}`;
        }
    }

    // Quiz Mode
    if (mode === 'quiz') {
        if (selection === null) {
            // 章選択ボタン
            document.querySelectorAll('.chapter-button').forEach(btn => {
                btn.addEventListener('click', () => loadContent('quiz', parseInt(btn.dataset.chapterId)));
            });
        } else {
            // クイズ操作
            document.querySelectorAll('.option-button').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const all = document.querySelectorAll('.option-button');
                    all.forEach(b => b.style.border = "none");
                    e.target.style.border = "2px solid #00bcd4";
                    e.target.dataset.selected = "true";
                });
            });
            document.getElementById('check-quiz-button').addEventListener('click', () => {
                const selected = document.querySelector('.option-button[style*="solid"]');
                if(!selected) return;
                const ans = selected.textContent;
                const correct = QUIZ_DATA[currentQuizIndex].correct_answer;
                const fb = document.getElementById('quiz-feedback');
                if (ans === correct) {
                    fb.innerHTML = "<span style='color:lime'>正解！</span>";
                } else {
                    fb.innerHTML = "<span style='color:red'>不正解... 正解は: " + correct + "</span>";
                }
            });
            
            // ナビゲーション
            document.getElementById('next-quiz').addEventListener('click', () => {
                if(currentQuizIndex < QUIZ_DATA.length - 1) {
                    currentQuizIndex++; loadContent('quiz', selection);
                }
            });
            document.getElementById('prev-quiz').addEventListener('click', () => {
                if(currentQuizIndex > 0) {
                    currentQuizIndex--; loadContent('quiz', selection);
                }
            });
            document.getElementById('back-quiz-select').addEventListener('click', () => loadContent('quiz', null));
        }
    }

    // Challenge Mode
    if (mode === 'challenge') {
        if (selection !== 'solve') {
            // 説明画面
            document.getElementById('next-ch').addEventListener('click', () => {
                if(currentChallengeIndex < CHALLENGE_DATA.length -1) {
                    currentChallengeIndex++; loadContent('challenge');
                }
            });
            document.getElementById('prev-ch').addEventListener('click', () => {
                if(currentChallengeIndex > 0) {
                    currentChallengeIndex--; loadContent('challenge');
                }
            });
            document.getElementById('start-solve-button').addEventListener('click', () => loadContent('challenge', 'solve'));
            document.getElementById('show-solution-button').addEventListener('click', () => {
                const area = document.getElementById('solution-container');
                area.style.display = 'block';
                document.getElementById('solution-code').textContent = CHALLENGE_DATA[currentChallengeIndex].solution_code;
            });
        } else {
            // 穴埋め画面
            document.getElementById('back-to-desc').addEventListener('click', () => loadContent('challenge', null));
            document.getElementById('check-answer-button').addEventListener('click', () => {
                const input = document.getElementById('user-input').value.replace(/\s/g, '');
                const correct = CHALLENGE_DATA[currentChallengeIndex].correct_snippet.replace(/\s/g, '');
                const fb = document.getElementById('check-feedback');
                if(input === correct) fb.innerHTML = "<span style='color:lime'>正解！</span>";
                else fb.innerHTML = "<span style='color:red'>不正解</span>";
            });
        }
    }
    
    // Review Mode
    if (mode === 'review') {
         document.getElementById('next-rev').addEventListener('click', () => {
            if(currentReviewIndex < REVIEW_DATA.length -1) {
                currentReviewIndex++; loadContent('review');
            }
        });
        document.getElementById('prev-rev').addEventListener('click', () => {
            if(currentReviewIndex > 0) {
                currentReviewIndex--; loadContent('review');
            }
        });
    }
}