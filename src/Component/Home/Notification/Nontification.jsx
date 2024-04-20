import React from "react";
import styles from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

const Notification = () =>{
    return(
        <div className="bg-[#2D2D2D] w-full  p-[10px] mb-[20px] rounded">
            <div
              className={`bg-[#252525] rounded-[50px]  inline-flex w-[40px] h-[40px] items-center justify-center ${styles.icon}`}
            >
              <span className="text-white text-[20px]">
                <FontAwesomeIcon icon={faBullhorn} />
              </span>
            </div>
            <div className={styles.notification}>
              <ul>
                <li className={`text-[#F3DD3C] ${styles.listItem}`}>
                  Lưu hoặc nhớ ngay link rút gọn
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="text-white">
                    {' '}bit.ly/TAIHEN{' '}
                  </a>
                  để truy cập khi nhà mạng chặn!
                </li>
                <li className={`text-[#F3DD3C] ${styles.listItem}`}>
                  Mời bạn tham gia Group
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="text-[#E62117]">
                    {' '}tại đây!{' '}
                  </a>
                  hoặc tham gia Discord
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="text-[#E62117]">
                    {' '}tại đây!{' '}
                  </a>
                  để ủng hộ{' '}
                  <span className="text-[#E62117]">TAIHEN</span>
                </li>
                <li className={`text-[#F3DD3C] ${styles.listItem}`}>
                  Do thiếu hút kinh phí nên quảng cáo có thể gây khó chịu, rất mong các bạn thông cảm!
                </li>
              </ul>
            </div>
          </div>
    )
}
export default Notification;