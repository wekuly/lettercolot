import { useState } from 'react';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';
import './style.css';
import icreset from './assets/ic-reset.svg';


const INITIAL_VALUE = 'rock';
//초기화, 처음값 고정

function getResult(me, other) {

    const comparison = compareHand(me, other);
    if (comparison > 0) return '승리';
    if (comparison < 0) return '패배';
    return '무승부';
}

function App() {
    const [hand, setHand] = useState(INITIAL_VALUE);
    const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
    //내가낸 hand, 컴퓨터가낸 otherhand

    const [gameHistory, setGameHistory] = useState("");
    //결과 알림
    const [score, setScore] = useState(0);
    const [otherScore, setOtherScore] = useState(0);
    //내점수, 컴퓨터 점수
    const [bet, setBet] = useState(1);
    //이기면 올라가는 점수량
    const [mywin, setMywin] = useState("Hand");
    const [otherwin, setOtherwin] = useState("Hand");
    //이겼다는 표시, className바꾸기

    const handleButtonClick = (nextHand) => {
        // <HandButton> 에서 value값 받아오기

        const nextOtherHand = generateRandomHand();
        //utils.js / 랜덤으로 가위바위보 중 하나 반환
        const nextHistoryItem = getResult(nextHand, nextOtherHand);
        const comparison = compareHand(nextHand, nextOtherHand);
        //utils.js / 승리 1 패배 -1 무승부 0 반환
        setHand(nextHand);
        setOtherHand(nextOtherHand);
        setGameHistory(nextHistoryItem);
        if (comparison > 0) {
            setScore(score + bet);
            setMywin("Hand Hand-winner");
            setOtherwin("Hand");
        }// 승리
        if (comparison < 0) {
            setOtherScore(otherScore + bet);
            setOtherwin("Hand Hand-winner");
            setMywin("Hand");
        }//패배
        if (comparison === 0) {
            setMywin("Hand");
            setOtherwin("Hand");
        }//무승부
    };

    const handleClearClick = () => {
        setHand(INITIAL_VALUE);
        setOtherHand(INITIAL_VALUE);
        setGameHistory([]);
        setScore(0);
        setOtherScore(0);
        setBet(1);
        //초기화
    };


    const handleBetChange = (e) => {
        let num = Number(e.target.value);
        if (num > 9) num %= 10;
        if (num < 1) num = 1;
        num = Math.floor(num);
        setBet(num);
        //베팅숫자 다른걸로 못치게끔. 숫자로 고정
    };

    return (
        <div className='App'>
            <div className='App-Head'>
                <h1 class="App-heading">가위바위보</h1>
                <img className="App-reset" src={icreset} alt="초기화"
                    onClick={handleClearClick} />

            </div>

            <div class="App-scores">
                <div class="Score">
                    <div class="Score-num">{score}</div>
                    <div class="Score-name">나</div>
                </div>
                <div class="App-versus">:</div>
                <div class="Score">
                    <div class="Score-num">{otherScore}</div>
                    <div class="Score-name">상대</div>
                </div>
            </div>
            <div class="Box App-box">
                <div class="Box-inner">
                    <div class="App-hands">
                        <div class={mywin}>
                            <HandIcon value={hand} className="Hand-icon" />
                        </div>
                        <div class="App-versus">VS</div>
                        <div class={otherwin}>
                            <HandIcon value={otherHand} className="Hand-icon" />
                        </div>
                    </div>
                    <div class="App-bet">
                        배점<input type="number" value={bet} min={1} max={9} onChange={handleBetChange}></input>
                    </div>
                    <div class="App-history">
                        <h2>{gameHistory}</h2>
                    </div>
                </div>
            </div>
            <div>
                <HandButton value="rock" onClick={handleButtonClick} />
                <HandButton value="scissor" onClick={handleButtonClick} />
                <HandButton value="paper" onClick={handleButtonClick} />
                {/* 가위바위보 골라서 내기 */}
            </div>
        </div>
    );
}

export default App;
