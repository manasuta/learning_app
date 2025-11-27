// ===================================
// 0. 課題・問題データの定義 (日本語)
// ===================================

const CHALLENGE_DATA = [
    // --- 【第2回課題】配列とメソッド ---
    {
        id: 1,
        title: "課題2-1: FiveEvenNumbers（偶数配列と表示）",
        file: "FiveEvenNumbers.java",
        description: "長さ5の `int` 型配列を定義し、コンストラクタで0から始まる最初の5つの偶数を格納し、`showAll()` で表示します。",
        keywords: ["配列宣言", "コンストラクタ", "forループ", "偶数計算 (i * 2)"],
        hints: "配列のサイズは `new int[5]` で固定です。`for` ループで `i` が 0 から 4 まで変化するのを利用して偶数を生成します。",
        solution_code: `// FiveEvenNumbers.java (主要メソッドの解答)
public FiveEvenNumbers(){
    even = new int[5];
    for(int i=0; i<5; i++){
        even[i] = i * 2;
    }
}

public void showAll(){
    System.out.print("5番目までの偶数:");
    for(int i=0; i<5;i++){
        System.out.print("    " + even[i]);
    }
}
`
    },
    {
        id: 2,
        title: "課題2-2: EvenNumbers（可変長偶数配列）",
        file: "EvenNumbers.java",
        description: "配列サイズを引数で受け取るコンストラクタを実装し、そのサイズの偶数配列を作成・格納し、`showAll()` で表示します。",
        keywords: ["Scanner", "可変長配列", "コンストラクタ引数", "System.out.printf"],
        hints: "コンストラクタの引数 `size` を使って配列 `even` を初期化し、ループの条件に `even.length` を使います。",
        solution_code: `// EvenNumbers.java (主要メソッドの解答)
public EvenNumbers(int size){
    even = new int[size];
    for(int i=0; i<size;i++){
        even[i] = i * 2; 
    }
}

public void showAll(){
    System.out.print(even.length + "番目までの偶数:");
    for(int i=0; i< even.length; i++){
        System.out.printf("    %4d", even[i]);
    }
}
`
    },
    {
        id: 3,
        title: "課題2-3: FourNames（文字列配列の操作）",
        file: "FourNames.java",
        description: "長さ4の `String` 配列を操作する `getName()` と `setName()` を実装し、添字が範囲外の場合のエラー処理も行います。",
        keywords: ["文字列配列", "ゲッター/セッター", "添字チェック", "nullを返す"],
        hints: "添字 `idx` が `0` 以上かつ `names.length` 未満であることを確認します。",
        solution_code: `// FourNames.java (主要メソッドの解答)
public String getName(int idx){
    if(idx >= 0 && idx < this.names.length){
        return this.names[idx];
    }else{
        return null;
    }
}

public void setName(int idx, String newName){
    if(idx >= 0 && idx < this.names.length){
        this.names[idx] = newName;
    }else{
        System.out.println("範囲外の添字を指定しています");
    }
}
`
    },
    {
        id: 4,
        title: "課題2-4: MaxMinAndSumOfNumbers（統計計算と操作）",
        file: "MaxMinAndSumOfNumbers.java",
        description: "`max()`, `min()`, `sum()` などの統計メソッドと、要素を操作するメソッド（`incrementElement`, `copyElement` など）を実装します。",
        keywords: ["最大値/最小値", "総和計算", "配列操作", "配列長チェック"],
        hints: "配列が空の場合の `max()` や `min()` は、それぞれ `Integer.MIN_VALUE`、`Integer.MAX_VALUE` を返すのが定石です。`sum()` は拡張for文が便利です。",
        solution_code: `// MaxMinAndSumOfNumbers.java (主要メソッドの解答)
public int max() { 
    if (this.numbers.length == 0) return Integer.MIN_VALUE;
    int currentMax = this.numbers[0];

    for (int i = 1; i < this.numbers.length; i++) {
        if (this.numbers[i] > currentMax) {
            currentMax = this.numbers[i];
        }
    }
    return currentMax;
}

public int min() { 
    if (this.numbers.length == 0) return Integer.MAX_VALUE; 
    int currentMin = this.numbers[0];
    for (int i = 1; i < this.numbers.length; i++) {
        if (this.numbers[i] < currentMin) {
            currentMin = this.numbers[i];
        }
    }
    return currentMin;
}

public int sum() { 
    int currentSum = 0;
    for (int element : this.numbers) {
        currentSum += element;
    }
    return currentSum;
}

public void copyElement(int dest, int src) { 
    if (dest >= 0 && dest < this.numbers.length && src >= 0 && src < this.numbers.length) {
        this.numbers[dest] = this.numbers[src];
    } else {
        System.out.println("範囲外の添字を指定しています.");
    }
}
`
    },

    // --- 【第5回課題】HashMap/ArrayListによる時間割管理 ---
    {
        id: 5,
        title: "課題5-1: LectureクラスのゲッターとisValidDayの実装",
        file: "Lecture.java",
        description: "Lectureクラスのフィールドに値を正しく設定し、全てのゲッターを完成させてください。また、曜日が有効かどうかをチェックする toValidDayOrNull と isValidDay メソッドを完成させましょう。",
        keywords: ["ゲッター", "コンストラクタ", "isValidDay", "拡張for文", "nullチェック"],
        hints: "コンストラクタ内で toValidDayOrNull を呼び出し、結果を day フィールドに設定してください。isValidDay では day が null でないかをチェックします。",
        solution_code: `// Lecture.java (主要メソッドの解答)
    public Lecture(String name, String room, String day, int timeSlot, String teacher) {
        this.day = toValidDayOrNull(day);
        this.name = name;  
        this.room = room;
        this.timeSlot = timeSlot;
        this.teacher = teacher;
    }

    private String toValidDayOrNull(String raw) {
        if (raw == null) return null;
        for (String validDay : VALID_DAYS) { // VALID_DAYS は {"月", "火", ...}
            if (validDay.equals(raw)) {
                return raw;
            }
        }
        return null;
    }

    public boolean isValidDay() {
        return this.day != null;
    }

    public String getName() { return this.name; }
    public String getRoom() { return this.room; }
    public String getDay() { return this.day; }
    public int getTimeSlot() { return this.timeSlot; }
    public String getTeacher() { return this.teacher; }
`
    },
    {
        id: 6,
        title: "課題5-2: TimeTableの基本機能（add/showAll/showOfDay）",
        file: "TimeTable.java",
        description: "TimeTableクラスの isDayRegistered, addLecture, showLecturesOfDay, showAllLectures を実装します。特に addLecture では、同じ授業がすでに登録されていないかチェックする必要があります。",
        keywords: ["HashMap", "ArrayList", "containsKey", "indexOf", "toString"],
        hints: "HashMap に曜日をキーとする ArrayList<Lecture> を格納します。addLecture では、同じ授業が既にあれば登録を拒否します。",
        solution_code: `// TimeTable.java (主要メソッドの解答, 課題5-2のみ)
    public TimeTable() {
        timetable = new HashMap<String, ArrayList<Lecture>>();
        indexByRoom = new HashMap<String, ArrayList<Lecture>>(); // 課題6用
    }
    public boolean isDayRegistered(String day) {
        return timetable.containsKey(day); 
    }
    public boolean addLecture(Lecture lec) {
        if (!lec.isValidDay()) { return false; }
        String day = lec.getDay();
        if (isDayRegistered(day)) {
             ArrayList<Lecture> lectures = timetable.get(day);
             if(lectures.indexOf(lec) == -1){ // 同じ授業が未登録なら
                 lectures.add(lec);
                 // 課題6用: addToInvertedIndexes(lec);
                 return true;
             }
        }else{
             ArrayList<Lecture> lectures = new ArrayList<Lecture>();
             lectures.add(lec);
             timetable.put(day, lectures);
             // 課題6用: addToInvertedIndexes(lec);
             return true;
        }
        return false;
    }
    public boolean showLecturesOfDay(String day) {
        if(isDayRegistered(day)){
            ArrayList<Lecture> lectures = timetable.get(day);
            for(Lecture lec : lectures){
                System.out.println(lec);
            }
            return true;
        }
        return false;
    }
    public void showAllLectures() {
         for(String day : timetable.keySet()){
             showLecturesOfDay(day);
         }
    }
`
    },
    {
        id: 7,
        title: "課題5-3: showLecturesOfRoom（線形検索）の実装",
        file: "TimeTable.java",
        description: "showLecturesOfRoom メソッドを実装します。すべての登録授業を順にチェックし、指定された教室（room）と一致する授業を表示します。",
        keywords: ["線形探索", "ネストしたループ", "getRoom()", "timetable.values()"],
        hints: "timetable.values() で全授業のリストのリストを取得し、二重ループを使ってすべての授業を調べます。",
        solution_code: `// TimeTable.java (showLecturesOfRoomの解答)
    public boolean showLecturesOfRoom(String room) {
        boolean found = false;
        // timetable.values() は ArrayList<Lecture> のリストを返す
        for(ArrayList<Lecture> lectures : timetable.values()){
            for (Lecture lec : lectures) {
                if(lec.getRoom().equals(room)){
                    System.out.println(lec);
                    found = true;
                }
            }
        }
        return found;
    }
`
    },
    {
        id: 8,
        title: "課題5-4: showLecturesByNameRoomTeacher（多条件検索）の実装",
        file: "TimeTable.java",
        description: "授業名、教室、教員名で検索し、一致する授業を表示する showLecturesByNameRoomTeacher を実装します。引数が空白（\"\"）の場合は、その条件を無視して検索してください。",
        keywords: ["複合条件", "ブールフラグ", "equals(\"\")"],
        hints: "各条件について、「引数が空欄である」または「引数が授業情報と一致する」という論理式を作り、AND（&&）で結合します。",
        solution_code: `// TimeTable.java (showLecturesByNameRoomTeacherの解答)
    public boolean showLecturesByNameRoomTeacher(String name, String room, String teacher ) {
        int count = 0;
        for(ArrayList<Lecture> lectures : timetable.values()){
            for(Lecture lec : lectures){
                // 条件判定: nameが空文字列か、nameが一致するか
                boolean nameMatch = name.equals("") || name.equals(lec.getName());
                boolean roomMatch = room.equals("") || room.equals(lec.getRoom());
                boolean teacherMatch = teacher.equals("") || teacher.equals(lec.getTeacher());
                
                if(nameMatch && roomMatch && teacherMatch){
                    System.out.println(lec);
                    count++;
                }
            }
        }
        return count > 0;
    }
`
    },
    {
        id: 9,
        title: "課題5-5: removeLectureの実装",
        file: "TimeTable.java",
        description: "指定された授業を削除する removeLecture を実装します。削除に成功したら true を返し、授業リストが空になったら HashMap のエントリも削除する必要があります。",
        keywords: ["ArrayList.remove()", "isEmpty()", "HashMap.remove(key)"],
        hints: "ArrayList の remove(Object) メソッドは、オブジェクトが見つかって削除に成功した場合に true を返します。",
        solution_code: `// TimeTable.java (removeLectureの解答)
    public boolean removeLecture(Lecture lec) {
        String day = lec.getDay();
        if(isDayRegistered(day)){
             ArrayList<Lecture> lectures = timetable.get(day);
             // 授業をリストから削除（Lecture.equals()が使われる）
             if(lectures.remove(lec)){
                 // 課題6用: removeFromInvertedIndexes(lec);
                 
                 if(lectures.isEmpty()){
                     // リストが空になったらHashMapからエントリを削除
                     timetable.remove(day);
                 }
                 return true;
             }
         }
        return false;
    }
`
    },
    {
        id: 10,
        title: "課題5-6: 逆引きインデックスの実装（発展）",
        file: "TimeTable.java",
        description: "教室名からの高速検索を可能にする逆引きインデックス（indexByRoom）を完成させます。addLecture/removeLecture の中でインデックスを更新するメソッドを呼び出し、showLecturesOfRoomIndexed を実装してください。",
        keywords: ["逆引きインデックス", "インデックスの同期", "addToInvertedIndexes", "removeFromInvertedIndexes"],
        hints: "課題6のテストをパスするためには、addLecture と removeLecture の適切な位置で、それぞれ addToInvertedIndexes と removeFromInvertedIndexes を呼び出す必要があります。",
        solution_code: `// TimeTable.java (課題5-6の解答: 呼び出しと実装)

    // 呼び出し例: addLecture/removeLecture内で呼び出す
    // if(lectures.indexOf(lec) == -1){ ... lectures.add(lec); addToInvertedIndexes(lec); ... }
    // if(lectures.remove(lec)){ removeFromInvertedIndexes(lec); ... }

    public boolean showLecturesOfRoomIndexed(String room) {
        if (indexByRoom.containsKey(room)) {
            ArrayList<Lecture> lectures = indexByRoom.get(room);
            for (Lecture lec : lectures) {
                System.out.println(lec);
            }
            return true;
        }
        return false;
    }

    private void addToInvertedIndexes(Lecture lec) {
        String room = lec.getRoom();
        if (indexByRoom.containsKey(room)) {
            indexByRoom.get(room).add(lec);
        } else {
            ArrayList<Lecture> lectures = new ArrayList<Lecture>();
            lectures.add(lec);
            indexByRoom.put(room, lectures);
        }
    }

    private void removeFromInvertedIndexes(Lecture lec) {
        String room = lec.getRoom();
        if (indexByRoom.containsKey(room)) {
            ArrayList<Lecture> lectures = indexByRoom.get(room);
            lectures.remove(lec);
            if (lectures.isEmpty()) {
                indexByRoom.remove(room);
            }
        }
    }
`
    },

    // --- 【第6回課題】スタックと探索 ---
    {
        id: 11, 
        title: "課題6-1: MyStackクラスの基本実装と演算",
        file: "mystack/MyStack.java",
        description: "ArrayList を使ってスタック（MyStack）の基本操作（push, pop, size, clear, add, sigma, pi）を完成させてください。",
        keywords: ["スタック", "ArrayList", "LIFO", "push", "pop", "remove(index)", "isEmpty"],
        hints: "popやaddメソッドでは、常にリストの**末尾（サイズ-1）**を操作する必要があります。addメソッドは、最上位の2つの要素を取り出して計算し、結果をプッシュし直します。",
        solution_code: `// MyStack.java (主要メソッドの解答)
    public void push(int item) { stack.add(item); }
    public int size(){ return stack.size(); }
    public void clear(){ stack.clear(); }
    
    public int pop() {
        if (stack.isEmpty()) { /* エラー処理 */ System.exit(1); }
        return stack.remove(stack.size() - 1);
    }
    
    public void add() {
        if (stack.size() < 2) { /* エラー処理 */ System.exit(1); }
        int value1 = stack.remove(stack.size() - 1); // 最上位のA
        int value2 = stack.remove(stack.size() - 1); // 次のB
        stack.add(value1 + value2);
    }
    
    public void sigma() {
        int sum = 0;
        while (!stack.isEmpty()) {
            sum += stack.remove(stack.size() - 1);
        }
        stack.add(sum);
    }
    
    public void pi() {
        int product = 1;
        while (!stack.isEmpty()) {
            product *= stack.remove(stack.size() - 1);
        }
        stack.add(product);
    }
`
    },
    {
        id: 12, 
        title: "課題6-2: RPNCalcによる逆ポーランド記法の計算",
        file: "rpncalc/RPNCalc.java",
        description: "逆ポーランド記法で書かれた数式を解析し、MyStackクラスを使って計算結果を返す cal() メソッドを実装します。",
        keywords: ["逆ポーランド記法 (RPN)", "スタック", "split(\" \")", "Integer.parseInt", "エラー処理", "System.exit"],
        hints: "減算/乗算は取り出す順序（b-a, b*a）に注意が必要です。ループ終了後、スタックのサイズが1でない場合はエラーです。",
        solution_code: `// RPNCalc.java (cal() メソッドの解答)
public int cal() {
    String[] token = exp.split(" ");
    int a;
    int b;
    
    for(String word : token ) {
        switch(word){
            case "+":
                stack.add();
                break;
            case "-":
                a = stack.pop(); 
                b = stack.pop();
                stack.push(b - a); // 順序注意
                break;
            case "*":
                a = stack.pop();
                b = stack.pop();
                stack.push(b * a); // 順序注意
                break;
            default:
                stack.push(Integer.parseInt(word));
                break;
        }
    }
    
    if(stack.size() != 1){
        System.out.println("数式に誤りがあります");
        System.exit(0) ;
    }
    return stack.pop();
}
`
    },
    {
        id: 13, 
        title: "課題6-3: SolveMazeによる迷路の深さ優先探索",
        file: "solve_maze/SolveMaze.java",
        description: "スタックを用いた深さ優先探索（DFS）により、迷路のスタートからゴールまでの経路を見つけます。showMaze(), findNext() の実装も必要です。",
        keywords: ["深さ優先探索 (DFS)", "バックトラック", "スタック", "探索順序", "配列の境界チェック"],
        hints: "findNext() では、右・下・左・上の順に移動可能かをチェックし、配列の境界と、迷路の幅を使った左右への回り込み防止ロジックが重要です。",
        solution_code: `// SolveMaze.java (findNext() メソッドの解答)
public int findNext(int pos) {
    int retv = -1;
    int[] nextPos = { pos + 1, pos + this.width, pos - 1, pos - this.width };
    int currentRow = pos / this.width; 

    for (int i = 0; i < 4; i++) {
        int next = nextPos[i];
        
        if (next >= 0 && next < this.maze.length) {
            if (i == 0 || i == 2) { 
                if (next / this.width != currentRow) {
                    continue; // 左右の回り込み防止
                }
            }

            int state = this.maze[next];
            if (state == 0 || state == 9) { // 0:通路 or 9:ゴール
                retv = next;
                break; 
            }
        }
    }
    return retv;
}
// solve() メソッドは長大なため、上記 findNext() の実装がコアです。
`
    },

    // --- 【第7回課題】オブジェクト連携とコレクション ---
    {
        id: 14, 
        title: "課題7-1/3: Studentクラスの基本実装と解答作成",
        file: "kadai07/Student.java",
        description: "Studentクラスのコンストラクタ、ゲッター、セッター、および解答作成（makeAnswers）と提出（submitAnswers）機能を実装します。",
        keywords: ["Random", "ArrayList.add", "randBrain.nextBoolean", "teacher.markScore(this)"],
        hints: "乱数オブジェクト `randBrain` は `studentID` で初期化します。解答提出は `teacher.markScore(this)` を使います。",
        solution_code: `// Student.java (主要メソッドの解答)
    public Student (String name) {
        this.name = name;
        this.studentID = -1;
    }
    public void setStudentID(int studentID) {
        this.studentID = studentID;
        this.randBrain = new Random(studentID);
    }
    public Integer getStudentID() { return studentID; }
    public String getName () { return name; }
    
    public void makeAnswers (int nquestions) {
        this.answerList = new ArrayList<>();
        for(int i = 0; i <nquestions; i++){
            answerList.add(this.randBrain.nextBoolean());
        }
    }
    public void submitAnswers (Teacher teacher, int nquestions) {
        makeAnswers(nquestions);
        teacher.markScore(this);
    }
`
    },
    {
        id: 15, 
        title: "課題7-2: Officeクラスによる情報管理",
        file: "kadai07/Office.java",
        description: "Officeクラスに、科目登録、学生登録、採点結果の登録/取得（Subjectへの委譲）機能を実装します。特に `assignStudentID` の重複チェックが重要です。",
        keywords: ["HashMap", "委譲", "assignStudentID", "registerSubject", "containsKey/containsValue"],
        hints: "scoreの登録と取得は、Subjectクラスの `setScore` / `getScore` メソッドに処理を委譲します。",
        solution_code: `// Office.java (主要メソッドの解答)
    public Office(String name) {
        this.name = name;
        this.subjectByTeacher = new HashMap<>();
        this.studentByID = new HashMap<>();
    }
    public boolean assignStudentID (Student student, int id) {
        if (id <= 0) return false;
        if (studentByID.containsKey(id)) return false;
        if (studentByID.containsValue(student)) return false; 
        studentByID.put(id, student);
        student.setStudentID(id);
        return true;
    }
    public void registerSubject(String subjectName, Teacher teacher) {
        Subject subject = new Subject(subjectName);
        subjectByTeacher.put(teacher, subject);
    }
    public int retrieveScore(Teacher teacher, Student student) {
        Subject subject = subjectByTeacher.get(teacher);
        return (subject == null) ? -1 : subject.getScore(student);
    }
    public void registerScore(Teacher teacher, Student student, int score) {
        Subject subject = subjectByTeacher.get(teacher);
        if (subject != null) { subject.setScore(student, score); }
    }
    // ... 他のメソッドも同様に委譲/実装
`
    },
    {
        id: 16, 
        title: "課題7-4/5/6: Teacherクラスの採点、落単/トップ表示",
        file: "kadai07/Teacher.java",
        description: "正解のセット、点数計算 (markScore)、単位を落とした学生の表示 (showDisqualified)、成績トップ3の表示 (showTop) を実装します。",
        keywords: ["正答率計算", "kindness下駄", "office.retrieveScore", "HashMapソート", "ゼロ埋め(%04d)"],
        hints: "点数計算は、優しさ(kindness)を引いた残りの(100-kindness)を正答率で配分します。トップ3の表示では、最大点を探した後、そのエントリをリストから削除する必要があります。",
        solution_code: `// Teacher.java (主要メソッドの解答)
    public void setRightAnswers (String rightAnswerString) {
        rightAnswerList = new ArrayList<>();
        for (int i = 0; i < rightAnswerString.length(); i++) {
            char c = rightAnswerString.charAt(i);
            if (c == '1') rightAnswerList.add(Boolean.TRUE);
            else if (c == '0') rightAnswerList.add(Boolean.FALSE);
        }
    }
    public int markScore (Student student) {
        // ... (正答数 correct の計算) ...
        int correct = 0; // 実際の実装では計算が必要
        int n = numQuestions();
        // kindness + (100 - kindness) * correct / n
        int score = (n == 0) ? kindness : kindness + ((100 - kindness) * correct) / n;
        office.registerScore(this, student, score);
        return score;
    }
    public void showDisqualified() {
        // ... (Officeからリストと点数 sc を取得) ...
        for (Student s : list) {
            int sc = office.retrieveScore(this, s);
            if (sc >= 0 && sc < 60) {
                System.out.printf("[%04d:%s]", s.getStudentID(), s.getName());
            }
        }
        System.out.println("");
    }
    public void showTop() {
        // ... (点数 map を作成し、トップ3をループで探し、idList.remove(Integer) で削除) ...
        // ... (詳細は長大なため、ここでは省略) ...
    }
`
    },
    
    // --- 【第8回課題】状態遷移（タイマー） ---
    {
        id: 17, 
        title: "課題8: 状態遷移機械によるタイマーの実装",
        file: "R08_YY_NNNN.java",
        description: "HashMap を使って状態遷移機械を実装し、タイマーの動作を定義します。特に、時間切れ（0秒）や状態維持のロジックを実装します。",
        keywords: ["状態遷移機械 (FSM)", "HashMap", "Enum", "状態(State)/イベント(Button)", "時間管理"],
        hints: "問1: 次状態は `stateMachine.get(currentState).get(pushedButton)` で取得します。問5: 次状態が READY なら `remainTime` を `initialTime` に戻します。問8: `remainTime == 0` の場合は `nextState` を BEEP に上書きします。",
        solution_code: `// R08_YY_NNNN.java (主要メソッドの解答)
// 問1, 4, 5, 8 (updateState内)
    void updateState(Button pushedButton) {
        System.out.printf("[%d %s]-(%s)-", remainTime, currentState, pushedButton);
        State nextState = State.COUNT; // 初期化は問1の外

        // 問１
        State tempNext = stateMachine.get(currentState).get(pushedButton);
        if (tempNext != null) nextState = tempNext;

        // 問４
        if (currentState == State.COUNT && nextState == State.COUNT) remainTime--;

        // 問５
        if (nextState == State.READY) remainTime = initialTime;

        // 問８
        if (remainTime == 0) nextState = State.BEEP;

        currentState = nextState != null ? nextState : State.READY;
    }   

// 問３, ６, ７, ９ (コンストラクタ内)
    R08_YY_NNNN(int presetTime) {
        // ... (READY状態の定義) ...
        stateMachine.put(State.COUNT, stateTransition = new HashMap<>());
        stateTransition.put(Button.RESET, State.READY);
        // 問３
        stateTransition.put(Button.IDOL, State.COUNT);
        // 問６
        stateTransition.put(Button.START, State.STOP);

        // 問７
        stateMachine.put(State.STOP, stateTransition = new HashMap<>());
        stateTransition.put(Button.RESET, State.READY);
        stateTransition.put(Button.IDOL, State.STOP);
        stateTransition.put(Button.START, State.COUNT);

        // 問９
        stateMachine.put(State.BEEP, stateTransition = new HashMap<>());
        stateTransition.put(Button.RESET, State.READY);
        stateTransition.put(Button.START, State.READY);
        stateTransition.put(Button.IDOL, State.BEEP);
    }
`
    }
];

const QUIZ_DATA = [
    // --- Chapter 1: オブジェクト生成とメソッド呼び出し ---
    {
        id: 1,
        topic: "1. オブジェクト生成とメソッド呼び出し",
        question: "Q: Javaで、一度値を代入したら変更できない変数を宣言するために使用するキーワードは何ですか？",
        code_example: "int x = 10; \n// ここに入るキーワードは？ \n___ int y = 20;",
        options: ["A. var", "B. const", "C. final", "D. static"],
        correct_answer: "C. final",
        explanation: "**final** キーワードは、変数を定数として扱います。一度初期値を代入すると、その後は値を変更できなくなります。Javaでは、JavaScriptやC++の 'const' ではなく 'final' を使用します。"
    },
    {
        id: 2,
        topic: "1. オブジェクト生成とメソッド呼び出し",
        question: "Q: Javaにおいて、小数点以下の数値を扱うために主に使用されるデータ型は何ですか？",
        code_example: "double price = 9.80; // この price の型は？",
        options: ["A. int", "B. String", "C. char", "D. double"],
        correct_answer: "D. double",
        explanation: "**double** は、浮動小数点数（小数点以下の数を含む数値）を格納するための主要なデータ型です。特に精度を重視する場合に広く使われます。"
    },
    {
        id: 3,
        topic: "1. オブジェクト生成とメソッド呼び出し",
        question: "Q: 変数 `x` の値が 10 よりも大きい場合にのみ、コードを実行したいときに使用する制御文は何ですか？",
        code_example: "if ( x __ 10 ) {\n    // 実行するコード\n}",
        options: ["A. <= ", "B. > ", "C. == ", "D. != "],
        correct_answer: "B. > ",
        explanation: "条件が**「10よりも大きい」**であるため、比較演算子 **>** (より大きい) を使用します。`x > 10` の場合のみ、ブロック内のコードが実行されます。"
    },
    {
        id: 4,
        topic: "1. オブジェクト生成とメソッド呼び出し",
        question: "Q: Javaで、`MyClass` というクラスの新しいインスタンスを生成するために使用するキーワードは何ですか？",
        code_example: "MyClass instance = ___ MyClass();",
        options: ["A. create", "B. make", "C. new", "D. object"],
        correct_answer: "C. new",
        explanation: "Javaでは、`new` 演算子を使用して、クラスの**コンストラクタ**を呼び出し、メモリ上に新しいオブジェクト（インスタンス）を生成します。"
    },
    {
        id: 5,
        topic: "1. オブジェクト生成とメソッド呼び出し",
        question: "Q: `myObject` というインスタンスが持つ `calculate()` メソッドを呼び出すために使用する記号は何ですか？",
        code_example: "myObject___calculate();",
        options: ["A. ::", "B. ->", "C. .", "D. ;"],
        correct_answer: "C. .",
        explanation: "インスタンス（オブジェクト）が持つメソッドを呼び出すには、**ドット演算子 (`.`)** を使用します。これはオブジェクトとそのメンバ（フィールドやメソッド）を結びつける役割を果たします。"
    },
    {
        id: 6,
        topic: "1. オブジェクト生成とメソッド呼び出し",
        question: "Q: Javaにおいて、変数に格納される値そのものを保持するデータ型を何と呼びますか？（例: int, boolean）",
        code_example: "int x = 10;",
        options: ["A. 参照型 (Reference Type)", "B. 抽象型 (Abstract Type)", "C. 基本データ型 (Primitive Type)", "D. 複合型 (Composite Type)"],
        correct_answer: "C. 基本データ型 (Primitive Type)",
        explanation: "**基本データ型 (Primitive Type)** は、値そのものをメモリに直接格納します。これに対し、クラスや配列などの**参照型**は、オブジェクト本体が格納されている場所（アドレス）を保持します。"
    },
    {
        id: 7,
        topic: "1. オブジェクト生成とメソッド呼び出し",
        question: "Q: 次のコードで、メモリ上にオブジェクトが生成されるタイミングはいつですか？\n\n`String s;`\n`s = new String(\"Hello\");`",
        code_example: "s = ___ String(\"Hello\");",
        options: ["A. 変数 s を宣言した時", "B. クラスがロードされた時", "C. new 演算子が実行された時", "D. System.out.println が呼ばれた時"],
        correct_answer: "C. new 演算子が実行された時",
        explanation: "Javaでは、クラス型の変数を宣言した時点ではオブジェクトは生成されません。**`new` 演算子が実行され、コンストラクタが呼び出された時**に、ヒープ領域にオブジェクトが生成されます。"
    },
    {
        id: 8,
        topic: "1. オブジェクト生成とメソッド呼び出し",
        question: "Q: `StringBuilder sb1 = new StringBuilder(\"A\");` の後、`StringBuilder sb2 = sb1;` を実行しました。このとき、sb2が保持している情報は何ですか？",
        code_example: "sb2 = sb1;",
        options: ["A. sb1 のオブジェクトのコピー（値そのもの）", "B. sb1 のオブジェクトのアドレス（参照先）", "C. 新しく生成された \"A\" の文字列", "D. null"],
        correct_answer: "B. sb1 のオブジェクトのアドレス（参照先）",
        explanation: "Javaの**参照型**では、代入 (`sb2 = sb1;`) はオブジェクト本体ではなく、**そのオブジェクトがメモリ上に存在する場所（アドレス）**をコピーします。結果として、sb1 と sb2 は同じオブジェクトを参照します。"
    },
    {
        id: 9,
        topic: "1. オブジェクト生成とメソッド呼び出し",
        question: "Q: メソッド呼び出しにおいて、メソッドに渡される引数を何と呼びますか？",
        code_example: "myMethod(引数);",
        options: ["A. 返り値", "B. パラメータ", "C. シグネチャ", "D. 戻り値"],
        correct_answer: "B. パラメータ",
        explanation: "メソッドを定義する際に受け取る変数を**パラメータ**と呼び、メソッドを呼び出す際に実際に渡される値を**引数（アーギュメント）**と呼びます。多くの場合、これらは区別されますが、Javaの文脈では引数（渡す値）を指してパラメータと呼ぶことも一般的です。"
    },
    
    // --- Chapter 2: クラスの定義 ---
    {
        id: 10,
        topic: "2. クラスの定義",
        question: "Q: Javaにおいて、**オブジェクトの設計図**または**ひな形**として機能するものは何ですか？",
        code_example: "class MyClass { ... }",
        options: ["A. インスタンス", "B. メソッド", "C. クラス", "D. フィールド"],
        correct_answer: "C. クラス",
        explanation: "**クラス**は、オブジェクトの設計図として機能します。"
    },
    {
        id: 11,
        topic: "2. クラスの定義",
        question: "Q: Javaプログラムの実行が**最初に開始される**場所として定義しなければならないメソッドのシグネチャは？",
        code_example: "public static void ___ (String[] args)",
        options: ["A. run", "B. start", "C. main", "D. execute"],
        correct_answer: "C. main",
        explanation: "Java Virtual Machine (JVM) は、`public static void main(String[] args)` を最初に実行します。"
    },
    {
        id: 12,
        topic: "2. クラスの定義",
        question: "Q: オブジェクトが**生成される直前に自動で呼び出され**、フィールドの初期化を行うための特殊なメソッドは何ですか？",
        code_example: "public MyClass() { ... }",
        options: ["A. 初期化子", "B. ゲッター", "C. コンストラクタ", "D. セッター"],
        correct_answer: "C. コンストラクタ",
        explanation: "**コンストラクタ**は、`new` 演算子によってオブジェクトが確保された直後に呼び出されます。"
    },
    {
        id: 13,
        topic: "2. クラスの定義",
        question: "Q: メソッド内で宣言され、**そのメソッドが終了すると消滅する**一時的な変数を何と呼びますか？",
        code_example: "void method() { int temp = 0; }",
        options: ["A. フィールド", "B. クラス変数", "C. インスタンス変数", "D. ローカル変数"],
        correct_answer: "D. ローカル変数",
        explanation: "**ローカル変数**は、メソッド内でのみ有効であり、メソッド終了時に解放されます。"
    },
    {
        id: 14,
        topic: "2. クラスの定義",
        question: "Q: メソッドやコンストラクタ内で、**「現在操作している自分自身のオブジェクト」**を参照するために使用するキーワードは何ですか？",
        code_example: "this.fieldName = fieldName;",
        options: ["A. self", "B. current", "C. this", "D. object"],
        correct_answer: "C. this",
        explanation: "**this** キーワードは、メソッドを実行している現在のインスタンス自体を指します。"
    },
    {
        id: 15,
        topic: "2. クラスの定義",
        question: "Q: 外部から**フィールドの値を読み取る**ためだけに用意された、引数がなく戻り値を持つメソッドは何ですか？",
        code_example: "public int getValue() { ... }",
        options: ["A. ファクトリメソッド", "B. ゲッター", "C. セッター", "D. リーダー"],
        correct_answer: "B. ゲッター",
        explanation: "フィールドの値を読み出すために**ゲッター (Getter)** が使用されます。"
    },
    {
        id: 16,
        topic: "2. クラスの定義",
        question: "Q: 同じクラス内に、**メソッド名は同じ**だが**引数の数や型が異なる**複数のメソッドを定義することを何と呼びますか？",
        code_example: "method(int a) と method(int a, int b)",
        options: ["A. オーバーライド", "B. オーバーロード", "C. 多重継承", "D. 委譲"],
        correct_answer: "B. オーバーロード",
        explanation: "**オーバーロード (Overload)** は、引数のリストを変更することで、同じ名前のメソッドで異なる処理を提供する仕組みです。"
    },
    {
        id: 17,
        topic: "2. クラスの定義",
        question: "Q: プログラムを複数行にわたって説明したいときに使う、C言語形式のコメントはどれですか？",
        code_example: "___ コメント ___",
        options: ["A. // ...", "B. /* ... */", "C. ", "D. ### ..."],
        correct_answer: "B. /* ... */",
        explanation: "複数行にわたるコメントには **`/* ... */`** が使用されます。"
    },
    
    // --- Chapter 3: 基本的な処理の記述 ---
    {
        id: 18,
        topic: "3. 基本的な処理の記述",
        question: "Q: Javaで、**小数点以下の数値**を表すリテラル（値）のデフォルトの型は何ですか？",
        code_example: "double price = 10.5;",
        options: ["A. float", "B. long", "C. double", "D. int"],
        correct_answer: "C. double",
        explanation: "明示的に 'f' を付加しない限り、小数点を含む数値リテラルはすべて **double 型**として扱われます。"
    },
    {
        id: 19,
        topic: "3. 基本的な処理の記述",
        question: "Q: キーボードからの入力（標準入力）を受け付けるために、`Scanner` クラスのインスタンスを生成する際に引数として指定するのはどれですか？",
        code_example: "Scanner sc = new Scanner(___);",
        options: ["A. System.out", "B. System.in", "C. System.err", "D. System.exit"],
        correct_answer: "B. System.in",
        explanation: "`System.in` は、標準入力ストリーム（通常はキーボード）を指します。"
    },
    {
        id: 20,
        topic: "3. 基本的な処理の記述",
        question: "Q: 変数 `x` の値を**1増やした後**に、その新しい値を式全体の値として利用する演算子はどれですか？",
        code_example: "int y = ___ x;",
        options: ["A. x++", "B. x--", "C. ++x", "D. --x"],
        correct_answer: "C. ++x",
        explanation: "**前置インクリメント (`++x`)** は、変数の値を変更した後でその値を式に使用します。"
    },
    {
        id: 21,
        topic: "3. 基本的な処理の記述",
        question: "Q: `double` 型の変数 `d` の値を、**情報が失われる可能性を許容して** `int` 型に変換するために必要な操作は何ですか？",
        code_example: "int i = ___ d;",
        options: ["A. i = (int) d;", "B. i = d.toInt();", "C. i = Integer.valueOf(d);", "D. i = d.round();"],
        correct_answer: "A. i = (int) d;",
        explanation: "より大きなデータ型からより小さなデータ型へ変換する際は、**明示的なキャスト (`(int)`)** が必要です。"
    },
    {
        id: 22,
        topic: "3. 基本的な処理の記述",
        question: "Q: 整数変数 `x` が **10以上** で **かつ** **20未満** であるかを判定するための条件式はどれですか？",
        code_example: "if ( x ___ ) { ... }",
        options: ["A. x > 10 || x < 20", "B. x >= 10 && x < 20", "C. x >= 10 || x <= 20", "D. x > 10 && x <= 20"],
        correct_answer: "B. x >= 10 && x < 20",
        explanation: "両方の条件が同時に成立する必要があるため、論理積演算子 **`&&` (AND)** を使用します。"
    },
    {
        id: 23,
        topic: "3. 基本的な処理の記述",
        question: "Q: `switch` 文において、どの `case` ラベルにも一致しなかった場合に実行されるコードブロックを示すキーワードは何ですか？",
        code_example: "switch(val) { case 1: ...; ___: ...; }",
        options: ["A. else", "B. finally", "C. default", "D. other"],
        correct_answer: "C. default",
        explanation: "**default** ラベルは、他のすべての `case` ラベルが一致しなかった場合の処理を定義します。"
    },
    {
        id: 24,
        topic: "3. 基本的な処理の記述",
        question: "Q: `for` ループの記述のうち、ループの**各反復の終了時**に実行される式はどこですか？",
        code_example: "for (初期化; 継続条件; ___ )",
        options: ["A. 初期化式", "B. 継続条件式", "C. 更新式", "D. 本文"],
        correct_answer: "C. 更新式",
        explanation: "**更新式**（例: `i++`）は、ループ本文が実行された後に実行されます。"
    },
    {
        id: 25,
        topic: "3. 基本的な処理の記述",
        question: "Q: ループの**現在の反復処理をスキップ**し、次の反復処理へすぐに移行するための制御文は何ですか？",
        code_example: "if (skip) ___ ;",
        options: ["A. break", "B. return", "C. continue", "D. exit"],
        correct_answer: "C. continue",
        explanation: "**continue** 文は、その後のループ本文の処理をスキップし、次のループサイクルに移行します。"
    },
    {
        id: 26,
        topic: "3. 基本的な処理の記述",
        question: "Q: Javaで文字列を結合するために使用される最も一般的な演算子はどれですか？",
        code_example: "String s = \"A\" ___ \"B\";",
        options: ["A. &", "B. ||", "C. +", "D. concat"],
        correct_answer: "C. +",
        explanation: "演算子 **`+`** は、文字列を結合するためにオーバーロードされます。"
    },
    {
        id: 27,
        topic: "3. 基本的な処理の記述",
        question: "Q: 2つの文字列 `s1` と `s2` が**保持する文字の並び**が完全に同じであるかを判定するためのメソッドはどれですか？",
        code_example: "s1.___ (s2)",
        options: ["A. == (等値演算子)", "B. isEquals()", "C. equals()", "D. compare()"],
        correct_answer: "C. equals()",
        explanation: "文字列の内容を比較するには **`equals()`** メソッドを使用します。"
    },
    
    // --- Chapter 4: 様々なデータ構造 (5章) ---
    {
        id: 28,
        topic: "4. 様々なデータ構造",
        question: "Q: Javaで、`int` 型の要素を10個格納するための配列を宣言し、初期化する正しい構文はどれですか？",
        code_example: "int[] nums = ___ ;",
        options: ["A. int[] nums = new int(10);", "B. int[] nums = {10};", "C. int[] nums = new int[10];", "D. int nums[] = 10;"],
        correct_answer: "C. int[] nums = new int[10];",
        explanation: "配列の宣言と初期化には、`new int[要素数]` の構文を使用します。"
    },
    {
        id: 29,
        topic: "4. 様々なデータ構造",
        question: "Q: 配列が持つ、配列の要素数を取得するための**フィールド**は何ですか？",
        code_example: "array.____",
        options: ["A. size()", "B. length", "C. count", "D. capacity"],
        correct_answer: "B. length",
        explanation: "配列の要素数を取得するフィールドは **`length`** です。"
    },
    {
        id: 30,
        topic: "4. 様々なデータ構造",
        question: "Q: **要素数が固定されており、直接的に基本データ型を格納できる**データ構造はどれですか？",
        code_example: "int[] array / ArrayList<Integer> list",
        options: ["A. ArrayList", "B. LinkedList", "C. 配列 (Array)", "D. HashMap"],
        correct_answer: "C. 配列 (Array)",
        explanation: "配列はサイズが固定され、基本データ型を直接格納できます。"
    },
    {
        id: 31,
        topic: "4. 様々なデータ構造",
        question: "Q: `ArrayList` が**基本データ型**の `int` を格納したい場合、ジェネリクス（`<...>`）内に指定すべき**ラッパークラス**は何ですか？",
        code_example: "ArrayList<___> list = new ArrayList<>();",
        options: ["A. int", "B. Integer", "C. Numeric", "D. Int"],
        correct_answer: "B. Integer",
        explanation: "`ArrayList` は参照型のみを受け付けるため、`int` のラッパークラスである **`Integer`** を使用します。"
    },
    {
        id: 32,
        topic: "4. 様々なデータ構造",
        question: "Q: `ArrayList` において、**特定のインデックス**にある要素を取り出すためのメソッドは何ですか？",
        code_example: "list.____ (index)",
        options: ["A. find(index)", "B. remove(index)", "C. get(index)", "D. elementAt(index)"],
        correct_answer: "C. get(index)",
        explanation: "インデックスを指定して要素を取得するには **`get(index)` メソッド**を使用します。"
    },
    {
        id: 33,
        topic: "4. 様々なデータ構造",
        question: "Q: `HashMap` において、値（Value）を取り出すために使用される識別子を何と呼びますか？",
        code_example: "HashMap<___, Value> map",
        options: ["A. エントリ", "B. インデックス", "C. キー (Key)", "D. エレメント"],
        correct_answer: "C. キー (Key)",
        explanation: "`HashMap` は**キー（Key）と値（Value）のペア**を格納するデータ構造です。"
    },
    {
        id: 34,
        topic: "4. 様々なデータ構造",
        question: "Q: 配列 `array` の**全要素**を順番に取り出して処理したいときに、最も簡潔に記述できるループ構文は何ですか？",
        code_example: "for (int item : array) { ... }",
        options: ["A. 拡張 for 文", "B. do-while 文", "C. 標準 for 文 (カウンタ付き)", "D. goto 文"],
        correct_answer: "A. 拡張 for 文",
        explanation: "**拡張 for 文 (Enhanced for loop)** は、コレクションの全要素を処理するのに適しています。"
    },

    // --- Chapter 5: メッセージパッシング・委譲 (6章) ---
    {
        id: 35,
        topic: "5. メッセージパッシング・委譲",
        question: "Q: あるオブジェクトが他のオブジェクトのメソッドを呼び出す行為を、比喩的に何と表現しますか？",
        code_example: "object.method();",
        options: ["A. データフロー", "B. メッセージパッシング", "C. ポインタ操作", "D. イベント発火"],
        correct_answer: "B. メッセージパッシング",
        explanation: "メソッド呼び出しは、オブジェクトに**メッセージを送る**行為として捉えられます。"
    },
    {
        id: 36,
        topic: "5. メッセージパッシング・委譲",
        question: "Q: あるクラスが持つべき機能の**実際の処理**を、そのクラスの**フィールド**として持つ別のオブジェクトに**任せる**設計手法を何と呼びますか？",
        code_example: "class A { private B b; method() { b.process(); } }",
        options: ["A. 継承", "B. オーバーライド", "C. 委譲", "D. 多重定義"],
        correct_answer: "C. 委譲",
        explanation: "**委譲 (Delegation)** は、処理を他のオブジェクトに任せる設計パターンです。"
    },
    {
        id: 37,
        topic: "5. メッセージパッシング・委譲",
        question: "Q: クラス `A` がクラス `B` のインスタンスを**フィールドとして保持している**場合、`A` と `B` はどのような関係にあると言えますか？",
        code_example: "class A { private B b; }",
        options: ["A. 依存関係", "B. 継承関係", "C. 多態関係", "D. 集約関係（Has-a関係）"],
        correct_answer: "D. 集約関係（Has-a関係）",
        explanation: "フィールドとして保持する関係は「**Has-a**」関係と呼ばれます。"
    },
    {
        id: 38,
        topic: "5. メッセージパッシング・委譲",
        question: "Q: クラス `A` がクラス `B` のフィールドにアクセスし、**委譲**を行う場合、`B` のメソッドは最低限どのアクセス修飾子を持つ必要がありますか？",
        code_example: "B.method()",
        options: ["A. private", "B. protected", "C. default (パッケージプライベート)", "D. public"],
        correct_answer: "D. public",
        explanation: "外部のクラスからメソッドを呼び出すには、**public**で宣言されている必要があります。"
    },
    
    // --- Chapter 6: 継承・抽象クラス (7章) ---
    {
        id: 39,
        topic: "6. 継承・抽象クラス",
        question: "Q: サブクラス `Sub` がスーパークラス `Super` の機能を引き継ぐために、クラス宣言で使用するキーワードは何ですか？",
        code_example: "class Sub ___ Super { ... }",
        options: ["A. implements", "B. inherits", "C. extends", "D. uses"],
        correct_answer: "C. extends",
        explanation: "**extends** キーワードを使用することで継承を行います。"
    },
    {
        id: 40,
        topic: "6. 継承・抽象クラス",
        question: "Q: サブクラスで、スーパークラスと同じシグネチャを持つメソッドを定義し、**動作を上書き**することを何と呼びますか？",
        code_example: "public void print() { ... } // 上書き",
        options: ["A. オーバーロード", "B. 委譲", "C. オーバーライド", "D. ポリモーフィズム"],
        correct_answer: "C. オーバーライド",
        explanation: "**オーバーライド (Override)** は、スーパークラスのメソッドの動作を上書きする仕組みです。"
    },
    {
        id: 41,
        topic: "6. 継承・抽象クラス",
        question: "Q: サブクラスのメソッド内から、**スーパークラスで定義されたオーバーライド前のメソッド**を呼び出す際に使用するキーワードは何ですか？",
        code_example: "___ .print();",
        options: ["A. this", "B. parent", "C. super", "D. old"],
        correct_answer: "C. super",
        explanation: "**super** キーワードは、スーパークラスのメンバにアクセスするために使用されます。"
    },
    {
        id: 42,
        topic: "6. 継承・抽象クラス",
        question: "Q: インスタンスを直接生成できず、**サブクラスに必ず実装させたい**メソッドを定義できるクラスは何ですか？",
        code_example: "___ class Shape { ... }",
        options: ["A. final", "B. static", "C. public", "D. abstract"],
        correct_answer: "D. abstract",
        explanation: "**abstract** 修飾子を持つ抽象クラスは、インスタンス化できません。"
    },
    {
        id: 43,
        topic: "6. 継承・抽象クラス",
        question: "Q: スーパークラス型の変数に、**サブクラスのインスタンスを代入できる**性質を何と呼びますか？",
        code_example: "Animal a = new Dog();",
        options: ["A. カプセル化", "B. 抽象化", "C. 委譲", "D. ポリモーフィズム"],
        correct_answer: "D. ポリモーフィズム",
        explanation: "**ポリモーフィズム (Polymorphism)** は、多様な型を一つの型として扱う性質です。"
    },

    // --- Chapter 7: インタフェース (8章) ---
    {
        id: 44,
        topic: "7. インタフェース",
        question: "Q: クラスに実装すべき**メソッドの仕様のみ**を定義し、フィールドは定数のみ許容される型の定義は何ですか？",
        code_example: "___ MyInterface { ... }",
        options: ["A. abstract class", "B. class", "C. interface", "D. enum"],
        correct_answer: "C. interface",
        explanation: "**interface** は、クラスが「できること」を定義するための抽象的な型です。"
    },
    {
        id: 45,
        topic: "7. インタフェース",
        question: "Q: クラス `MyClass` がインタフェース `MyInterface` の仕様を実装する場合、クラス宣言で使用するキーワードは何ですか？",
        code_example: "class MyClass ___ MyInterface { ... }",
        options: ["A. extends", "B. uses", "C. implements", "D. delegates"],
        correct_answer: "C. implements",
        explanation: "クラスがインタフェースを実装するには **implements** キーワードを使用します。"
    },
    {
        id: 46,
        topic: "7. インタフェース",
        question: "Q: Java 8以降、インタフェースに追加できる、**実装を持つ**（処理内容が記述された）メソッドを何と呼びますか？",
        code_example: "default void myMethod() { ... }",
        options: ["A. Static Method", "B. Private Method", "C. Default Method", "D. Abstract Method"],
        correct_answer: "C. Default Method",
        explanation: "**Default Method** は、インタフェースに実装を持つメソッドを定義するために導入されました。"
    },

    // --- Chapter 8: クラス定義に関する諸技術 (9章) ---
    {
        id: 47,
        topic: "8. クラス定義に関する諸技術",
        question: "Q: **同じパッケージ内**のどのクラスからもアクセス可能であり、かつ、**異なるパッケージのサブクラス**からもアクセス可能な修飾子は何ですか？",
        code_example: "___ int value;",
        options: ["A. private", "B. public", "C. protected", "D. default (指定なし)"],
        correct_answer: "C. protected",
        explanation: "**protected** は、パッケージ内すべてと、パッケージ外のサブクラスからのアクセスを許可します。"
    },
    {
        id: 48,
        topic: "8. クラス定義に関する諸技術",
        question: "Q: メソッドに `final` を付けると、そのメソッドにどのような制限が加わりますか？",
        code_example: "public final void process() { ... }",
        options: ["A. 別のクラスから呼び出せなくなる", "B. 処理速度が速くなる", "C. サブクラスでオーバーライドできなくなる", "D. インスタンスが生成できなくなる"],
        correct_answer: "C. サブクラスでオーバーライドできなくなる",
        explanation: "メソッドに `final` を付けると、サブクラスでの**オーバーライドが禁止**されます。"
    },
    {
        id: 49,
        topic: "8. クラス定義に関する諸技術",
        question: "Q: `static` フィールドにアクセスする際に、**インスタンスを生成せず**に、クラス名から直接アクセスする構文はどれですか？",
        code_example: "___ .CONSTANT;",
        options: ["A. this", "B. new", "C. ClassName", "D. final"],
        correct_answer: "C. ClassName",
        explanation: "**static** メンバはクラス名を使ってアクセスできます。"
    },

    // --- Chapter 9: ファイル操作 (10章) ---
    {
        id: 50,
        topic: "9. ファイル操作",
        question: "Q: ファイルの読み書きなど、**エラーが発生する可能性があるコード**を囲むブロックはどれですか？",
        code_example: "___ { /* 危険なコード */ }",
        options: ["A. finally", "B. try", "C. throw", "D. catch"],
        correct_answer: "B. try",
        explanation: "**try** ブロックは、例外が発生する可能性のあるコードを記述します。"
    },
    {
        id: 51,
        topic: "9. ファイル操作",
        question: "Q: ファイルやネットワークリソースの使用後に、`close()` メソッドの呼び出しを**自動で確実に行う**ために使用される構文は何ですか？",
        code_example: "___ (Resource r = new Resource()) { ... }",
        options: ["A. try-catch-finally", "B. try-with-resources", "C. AutoCloseable", "D. try-except"],
        correct_answer: "B. try-with-resources",
        explanation: "**try-with-resources** 文は、リソースを自動的に閉じます。"
    },

    // --- Chapter 10: ラムダ式とストリーム (11章) ---
    {
        id: 52,
        topic: "10. ラムダ式とストリーム",
        question: "Q: **メソッドを1つだけ持つインタフェース**（関数型インタフェース）のインスタンスを、簡潔に記述するために使用される構文は何ですか？",
        code_example: "(x, y) ___ { return x + y; }",
        options: ["A. ::", "B. ||", "C. ->", "D. =>"],
        correct_answer: "C. ->",
        explanation: "ラムダ式は、**アロー演算子 (`->`)** を使用して記述されます。"
    },
    {
        id: 53,
        topic: "10. ラムダ式とストリーム",
        question: "Q: コレクションなどの**データソースに対して、一連の処理（フィルタリング、マッピングなど）をパイプラインとして適用する**ための新しいAPIは何ですか？",
        code_example: "list.stream().filter(...)",
        options: ["A. Thread", "B. Iterator", "C. Stream", "D. Reflection"],
        correct_answer: "C. Stream",
        explanation: "**Stream** APIは、データ処理を関数型スタイルで行うための抽象化レイヤーです。"
    },
    {
        id: 54,
        topic: "10. ラムダ式とストリーム",
        question: "Q: ストリーム処理において、`filter()` や `map()` のように、**新しいストリームを生成し、処理を遅延させる**操作を何と呼びますか？",
        code_example: "list.stream().filter(x -> ...)",
        options: ["A. 終端操作", "B. 生成操作", "C. 中間操作", "D. リダクション操作"],
        correct_answer: "C. 中間操作",
        explanation: "**中間操作 (Intermediate Operation)** は、処理を遅延させます。"
    }
];

const REVIEW_DATA = [
    {
        id: 1,
        topic: "基本出力",
        title: "Hello Worldとコンソール出力",
        code_example: `public class Hello {
    public static void main(String[] args) {
        System.out.println("CLAで学習中！");
        System.out.print("数字は ");
        System.out.println(100);
    }
}`,
        explanation: "**System.out.println** メソッドは、引数を出力した後、改行します。**System.out.print** は改行しません。"
    },
    {
        id: 2,
        topic: "変数の宣言",
        title: "整数型と初期値",
        code_example: `public class DataTypes {
    public static void main(String[] args) {
        int count = 50;
        
        System.out.println("カウント: " + count);
    }
}`,
        explanation: "**int** は、整数を格納するための主要なデータ型です。`=` を使って初期値を代入しています。"
    },
    {
        id: 3,
        topic: "条件分岐",
        title: "if-else if-else文の基本構造",
        code_example: `public class IfElseExample {
    public static void main(String[] args) {
        int temp = 25;
        
        if (temp > 30) {
            System.out.println("暑い！");
        } else if (temp > 20) {
            System.out.println("快適です。");
        } else {
            System.out.println("寒いです。");
        }
    }
}`,
        explanation: "**if-else if-else** 構造は、複数の条件を順番にチェックするために使われます。"
    }
];

// ===================================
// 1. 進捗状況の保存と読み込み (LocalStorage)
// ===================================

/**
 * 現在のインデックスの状態をブラウザに保存する
 */
function saveProgress() {
    const progress = {
        quiz: currentQuizIndex,
        review: currentReviewIndex,
        challenge: currentChallengeIndex
    };
    localStorage.setItem('claAppProgress', JSON.stringify(progress));
}

/**
 * ブラウザに保存されているインデックスの状態を読み込む
 */
function loadProgress() {
    const saved = localStorage.getItem('claAppProgress');
    
    if (saved) {
        const progress = JSON.parse(saved);
        
        currentQuizIndex = progress.quiz || 0;
        currentReviewIndex = progress.review || 0;
        currentChallengeIndex = progress.challenge || 0;
    }
}


// ===================================
// 2. 問題データの追跡変数
// ===================================
let currentQuizIndex = 0; 
let currentReviewIndex = 0; 
let currentChallengeIndex = 0; 

let currentChapterId = null; 

loadProgress(); 

// ===================================
// 3. 初期要素の取得とイベントリスナーの設定
// ===================================
const appContainer = document.getElementById('app-container');

const practiceButton = document.getElementById('mode-practice');
const quizButton = document.getElementById('mode-quiz');
const reviewButton = document.getElementById('mode-review');
const challengeButton = document.getElementById('mode-challenge'); 

practiceButton.addEventListener('click', () => {
    loadContent('practice');
});

quizButton.addEventListener('click', () => {
    loadContent('quiz', null);
});

reviewButton.addEventListener('click', () => {
    loadContent('review');
});

challengeButton.addEventListener('click', () => { 
    loadContent('challenge');
});

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

// ===================================
// 4. モード選択画面に戻る処理
// ===================================
function showModeSelection() {
    saveProgress();
    window.location.reload(); 
}

// ===================================
// 5. メインコンテンツの読み込みと切り替え
// ===================================
/**
 * @param {string} mode - 選択されたモード 
 * @param {number|null} chapterSelection - クイズモードの場合、選択された章のID (0-indexed)
 */
function loadContent(mode, chapterSelection = null) {
    let contentHTML = '';
    let title = '';

    if (mode === 'quiz' && chapterSelection !== null) {
        currentChapterId = chapterSelection;
    }

    switch (mode) {
        case 'practice':
            title = 'コード入力・実行モード';
            contentHTML = `
                <h2>${title}</h2>
                <p>ここにJavaのコードを入力し、「RUN CODE」を押して実行結果を確認してください。</p>
                <div class="code-area">
                    <textarea id="java-code" placeholder="public class Main { ... }" rows="10"></textarea>
                    <button id="run-button">RUN CODE</button>
                    <pre id="output-area">実行結果がここに表示されます...</pre>
                </div>
                <button class="back-button">← モード選択に戻る</button>
            `;
            break;

        case 'quiz':
            if (chapterSelection === null) {
                // --- 章選択画面を表示 ---
                title = 'クイズ・章選択';
                const chapterListHTML = CHAPTER_TITLES.map((title, index) => `
                    <button class="chapter-button mode-button" data-chapter-id="${index}" style="background-color: #34495e;">
                        ${title}
                    </button>
                `).join('');

                contentHTML = `
                    <h2>${title}</h2>
                    <p>解きたい問題の章を選択してください。</p>
                    <div class="mode-selection" style="gap: 15px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
                        ${chapterListHTML}
                    </div>
                    <button class="back-button" style="margin-top: 20px;">← モード選択に戻る</button>
                `;

            } else {
                // --- 選択された章の問題を表示 ---
                
                const targetChapterTitle = CHAPTER_TITLES[currentChapterId];
                const chapterPrefix = targetChapterTitle.split('.')[0];

                // 選択された章の問題だけをフィルタリング
                const chapterQuizzes = QUIZ_DATA.filter(q => q.topic.startsWith(chapterPrefix));
                
                // 現在の章内でのインデックスとグローバルインデックスの調整
                let startIndex = QUIZ_DATA.findIndex(q => q.topic.startsWith(chapterPrefix));
                if (startIndex === -1) startIndex = 0;

                if (currentQuizIndex < startIndex || !QUIZ_DATA[currentQuizIndex] || !QUIZ_DATA[currentQuizIndex].topic.startsWith(chapterPrefix)) {
                     currentQuizIndex = startIndex;
                }
                
                const currentQuiz = QUIZ_DATA[currentQuizIndex]; 
                const currentQuizInChapterIndex = chapterQuizzes.findIndex(q => q.id === currentQuiz.id);
                
                const isFirstInChapter = currentQuizInChapterIndex === 0;
                const isLastInChapter = currentQuizInChapterIndex === chapterQuizzes.length - 1;

                // ナビゲーションボタンの制御
                const prevQuizButton = (!isFirstInChapter) ? 
                    `<button id="prev-quiz-button" style="background-color: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin: 10px 10px;">← 前の問題へ</button>` : '';

                const nextQuizButton = (!isLastInChapter) ? 
                    `<button id="next-quiz-button" style="background-color: #00bcd4; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin: 10px 10px;">次の問題へ →</button>` : '';

                // HTML生成
                const optionButtons = currentQuiz.options.map(opt => `<button class="option-button">${opt}</button>`).join('');

                title = 'クイズ・選択式モード';
                contentHTML = `
                    <h2>${title}</h2>
                    <p>${currentQuiz.topic} - 問題 #${currentQuiz.id} (${currentQuizInChapterIndex + 1}/${chapterQuizzes.length})</p>
                    <div class="quiz-area">
                        <p class="question">${currentQuiz.question}</p>
                        <pre class="code-example">${currentQuiz.code_example}</pre>
                        <div class="options">
                            ${optionButtons}
                        </div>
                        <div id="quiz-feedback" style="margin-top: 15px; font-weight: bold; color: #00bcd4;"></div>
                    </div>
                    <button id="check-quiz-button" style="background-color: #f39c12; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin: 10px 0;">答えをチェック</button>
                    <div style="margin-top: 10px;">
                        ${prevQuizButton}
                        ${nextQuizButton}
                    </div>
                    <button id="back-to-chapter-button" class="back-button">← 章選択に戻る</button>
                `;
            }
            break;

        case 'review':
            title = '復習・解説表示モード';
            const currentReview = REVIEW_DATA[currentReviewIndex]; 

            const prevReviewButton = (currentReviewIndex > 0) ? 
                `<button id="prev-review-button" style="background-color: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin: 10px 10px;">← 前の例題へ</button>` : '';

            const nextReviewButton = (currentReviewIndex < REVIEW_DATA.length - 1) ? 
                `<button id="next-review-button" style="background-color: #00bcd4; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin: 10px 10px;">次の例題へ →</button>` : '';

            contentHTML = `
                <h2>${title}</h2>
                <p>トピック: ${currentReview.topic} (${currentReviewIndex + 1}/${REVIEW_DATA.length})</p>
                <div class="review-area">
                    <h3>${currentReview.title}</h3>
                    <pre class="code-example">${currentReview.code_example}</pre>
                    <p><strong>解説:</strong> ${currentReview.explanation}</p>
                </div>
                <div style="margin-top: 10px;">
                    ${prevReviewButton}
                    ${nextReviewButton}
                </div>
                <button class="back-button">← モード選択に戻る</button>
            `;
            break;
            
        case 'challenge':
            title = '課題ステップバイステップ学習';
            const currentChallenge = CHALLENGE_DATA[currentChallengeIndex]; 

            const prevChButton = (currentChallengeIndex > 0) ? 
                `<button id="prev-ch-button" style="background-color: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin: 10px 10px;">← 前の課題へ</button>` : '';
            const nextChButton = (currentChallengeIndex < CHALLENGE_DATA.length - 1) ? 
                `<button id="next-ch-button" style="background-color: #2c3e50; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin: 10px 10px;">次の課題へ →</button>` : '';


            contentHTML = `
                <h2>${title}</h2>
                <p>現在取り組むべき課題を確認しましょう。(${currentChallengeIndex + 1}/${CHALLENGE_DATA.length})</p>
                <div class="review-area" style="background-color: #2c3e50; border-left: 5px solid #00bcd4; padding: 20px;">
                    <h3>${currentChallenge.title}</h3>
                    <p><strong>対象ファイル:</strong> <code>${currentChallenge.file}</code></p>
                    <p><strong>目的:</strong> ${currentChallenge.description}</p>
                    
                    <div style="margin-top: 20px; padding: 10px; background-color: #3e4c5e; border-radius: 4px;">
                        <h4>🛠️ ヒントとキーワード</h4>
                        <p><strong>キーワード:</strong> ${currentChallenge.keywords.join(' / ')}</p>
                        <p><strong>ヒント:</strong> ${currentChallenge.hints}</p>
                    </div>
                </div>
                
                <div style="margin-top: 20px;">
                    <button id="show-solution-button" style="background-color: #e74c3c; color: white; padding: 10px 20px; border: none; border-radius: 4px; margin: 10px 10px;">模範解答を表示</button>
                    ${prevChButton}
                    ${nextChButton}
                </div>
                
                <div id="solution-container" class="code-area" style="display: none; margin-top: 20px; text-align: left;">
                    <h4>模範解答 (${currentChallenge.file} の該当箇所)</h4>
                    <pre id="solution-code" style="color: #ffffff; background-color: #1e1e1e; padding: 15px; border: 1px solid #555;"></pre>
                </div>

                <button class="back-button">← モード選択に戻る</button>
            `;
            break;
    }

    // appContainerのコンテンツを新しいものに置き換え
    appContainer.innerHTML = contentHTML;

    // --- モードに応じてリスナーを設定 ---
    if (mode === 'practice') {
        setupPracticeModeListeners();
    } else if (mode === 'quiz' && chapterSelection === null) {
        setupChapterSelectionListeners();
    } else if (mode === 'quiz' && chapterSelection !== null) {
        setupQuizListeners();
        setupQuizNavigationListeners(); 
        
        document.getElementById('back-to-chapter-button').addEventListener('click', () => {
            loadContent('quiz', null); 
        });
    } else if (mode === 'review') {
        setupReviewNavigationListeners(); 
    } else if (mode === 'challenge') { 
        setupChallengeNavigationListeners();
        setupChallengeSolutionListener();
    }
    
    const backButton = document.querySelector('.back-button');
    if (backButton && backButton.id !== 'back-to-chapter-button') {
        backButton.addEventListener('click', showModeSelection);
    }
    
    saveProgress();
}


// ===================================
// 6. コード実行ロジック (Piston API利用版・安定版)
// ===================================
function setupPracticeModeListeners() {
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
        // 【修正】エンコーディングの問題を回避するため、日本語出力処理を削除
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

// ===================================
// 7. クイズ解答ロジック
// ===================================
/**
 * クイズモードが読み込まれた後に、選択肢ボタンにイベントリスナーを設定する
 */
function setupQuizListeners() {
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

// ===================================
// 8. 問題の切り替えロジック (クイズ/レビュー)
// ===================================
// クイズナビゲーションロジック
function setupQuizNavigationListeners() {
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


function setupReviewNavigationListeners() {
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

// ===================================
// 9. 課題の切り替えロジック (チャレンジ)
// ===================================
function setupChallengeNavigationListeners() {
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

// ===================================
// 10. 模範解答表示ロジック
// ===================================
/**
 * 課題モードの模範解答表示ロジックを設定する
 */
function setupChallengeSolutionListener() {
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


// ===================================
// 11. 章選択ロジック (新規追加)
// ===================================
function setupChapterSelectionListeners() {
    const chapterButtons = document.querySelectorAll('.chapter-button');

    chapterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const chapterId = parseInt(button.dataset.chapterId);
            
            // 選択された章のIDを渡し、クイズのロードを開始
            loadContent('quiz', chapterId);
        });
    });
}