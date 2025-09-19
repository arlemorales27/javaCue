import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroUnified)}>
      <div className="container">
        <div className={styles.heroLogoWrapper}>
          <img
            src={useBaseUrl('/img/logo.png')}
            alt="Universidad Alexander von Humboldt"
            className={styles.heroLogo}
          />
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>

        <div className={styles.courseContent}>
          <div className={styles.courseText}>
            <h2>Enfoque del curso</h2>
            <p>
              Este curso de <strong>Programación 1</strong> se centrará en el
              aprendizaje de conceptos fundamentales de la programación utilizando
              <span className={styles.accent}> Java</span> como lenguaje principal.
            </p>
            <div className={styles.buttons}>
              <Link
                className={clsx('button button--lg', styles.ctaButton)}
                to="/docs/intro"
              >
                Empezar curso 🚀
              </Link>
            </div>
          </div>
          <div className={styles.courseImages}>
            <img
              src={useBaseUrl('/img/java-logo.png')}
              alt="Java Logo"
              className={styles.courseLogo}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Curso de Programación 1 - Universidad Alexander von Humboldt"
    >
      <HomepageHeader />
    </Layout>
  );
}
