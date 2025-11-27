// --- logic/navigation.js ---
import { QUIZ_DATA, REVIEW_DATA } from '../data/index.js';
import { currentQuizIndex, currentReviewIndex, currentChallengeIndex, CHAPTER_TITLES } from './state.js';
import { loadContent } from '../main.js'; 

// --- クイズナビゲーションロジック ---
export function setupQuizNavigationListeners() {
    const nextButton = document.getElementById('next-quiz-button');
    const prevButton = document.getElementById('prev-quiz-button');
    const targetChapterTitle = CHAPTER_TITLES[currentChapterId];
    const chapterPrefix = targetChapterTitle.split('.')[0];
    
    // 次の問題のインデックスを探す (現在の章内の次の問題)
    function findNextQuizIndex(currentIndex) {
        for (let i = currentIndex + 1; i < QUIZ_DATA.length; i++) {
            if (QUIZ_DATA[i].topic.startsWith(chapterPrefix)) {
                return i;
            } else {
                return -1; // 章の終わり
            }
        }
        return -1;
    }
    
    // 前の問題のインデックスを探す (現在の章内の前の問題)
    function findPrevQuizIndex(currentIndex) {
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (QUIZ_DATA[i].topic.startsWith(chapterPrefix)) {
                return i;
            } else {
                return -1; // 章の始まり
            }
        }
        return -1;
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const nextIndex = findNextQuizIndex(currentQuizIndex);
            if (nextIndex !== -1) {
                currentQuizIndex = nextIndex;
                loadContent('quiz', currentChapterId); 
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const prevIndex = findPrevQuizIndex(currentQuizIndex);
            if (prevIndex !== -1) {
                currentQuizIndex = prevIndex;
                loadContent('quiz', currentChapterId);
            }
        });
    }
}


export function setupReviewNavigationListeners() {
    const nextButton = document.getElementById('next-review-button');
    const prevButton = document.getElementById('prev-review-button');

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentReviewIndex++;
            loadContent('review'); 
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentReviewIndex--;
            loadContent('review'); 
        });
    }
}

export function setupChallengeNavigationListeners() {
    const nextButton = document.getElementById('next-ch-button');
    const prevButton = document.getElementById('prev-ch-button');

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentChallengeIndex++;
            loadContent('challenge'); 
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentChallengeIndex--;
            loadContent('challenge'); 
        });
    }
}