// --- logic/state.js ---

// 追跡変数 (export let で他のファイルから値の読み書きが可能に)
export let currentQuizIndex = 0; 
export let currentReviewIndex = 0; 
export let currentChallengeIndex = 0; 
export let currentChapterId = null; 

export const CHAPTER_TITLES = [
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

// 進捗の保存/読み込み
export function saveProgress() {
    const progress = {
        quiz: currentQuizIndex,
        review: currentReviewIndex,
        challenge: currentChallengeIndex
    };
    localStorage.setItem('claAppProgress', JSON.stringify(progress));
}

export function loadProgress() {
    const saved = localStorage.getItem('claAppProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        // グローバル変数を更新
        currentQuizIndex = progress.quiz || 0;
        currentReviewIndex = progress.review || 0;
        currentChallengeIndex = progress.challenge || 0;
    }
}

// アプリ起動時に進捗を読み込む
loadProgress();