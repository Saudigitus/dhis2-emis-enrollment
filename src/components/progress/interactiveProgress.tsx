import Lottie from "lottie-react";
import styles from '../modal/modal.module.css'
import loading from '../../assets/animations/loading.json'
import LinearBuffer from "./linearProgress";
import download from '../../assets/animations/download.json'
import { useRecoilValue } from "recoil";
import upload from '../../assets/animations/upload.json'
import { ProgressState } from "../../schema/linearProgress";

export default function IteractiveProgress() {
    const progress = useRecoilValue(ProgressState)

    const style = {
        height: 400,
    };

    return (
        <div className={styles.loadingContainer}>
            <h1>{progress.stage == 'export' ? 'Exporting' : 'Importing'} progress</h1>
            <div className={styles.linearProgress}>
                <LinearBuffer />
                <span className={styles.percentagem} >{Math.round(progress.progress)}%</span>
            </div>
            <div className={styles.studentSeek}>
                {
                    progress.stage === 'export' ?
                        <Lottie style={style} className={styles.visble} animationData={download} loop={true} />
                        : <Lottie style={style} className={styles.visble} animationData={upload} loop={true} />
                }
            </div>
            <div className={styles.loading} >
                <span>{progress.stage == 'export' ? 'Exporting' : 'Importing'}  enrollment data</span>
                <Lottie style={{ height: 100, marginLeft: "-40px" }} animationData={loading} loop={true} />
            </div>
        </div>
    )
}