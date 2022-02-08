import HandIcon from './HandIcon';

function HandButton({ value, onClick }) {

    //value , 가위바위보
    const handleClick = () => onClick(value);
    // 가위바위보값 App.js 넘겨주기
    return (
        <button className="HandButton" onClick={handleClick}>
            <HandIcon className="HandButton-icon" value={value} />
            {/* 버튼안의 이미지 value마다 다른거 가져옴 */}
        </button>
    );
}

export default HandButton;
