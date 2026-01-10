
import { useRouter } from 'next/navigation';
import styles from '@/styles/pages/login.module.scss';
import { ROUTES_MENU } from '@/helper';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(ROUTES_MENU.HOME.path);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginLogo}>
          {/* <img
            src="/images/logo.png"
            alt="KONOIKE MEDICAL SUPPLIES"
          /> */}
        </div>

        <form className={styles.loginForm} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="hospitalId">医療機関ID</label>
            <input
              id="hospitalId"
              type="text"
              defaultValue="KONOIKE001"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="userId">ユーザID</label>
            <input
              id="userId"
              type="text"
              defaultValue="admin"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              defaultValue="password"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            ログイン
          </button>
        </form>

        <div className={styles.backLink}>
          <a href="/">トップページに戻る</a>
        </div>
      </div>
    </div>
  );
}
