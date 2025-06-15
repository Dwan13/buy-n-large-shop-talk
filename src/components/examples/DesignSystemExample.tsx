
import React from 'react';
import styles from './DesignSystemExample.module.scss';

interface DesignSystemExampleProps {
  title: string;
  description: string;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

export const DesignSystemExample: React.FC<DesignSystemExampleProps> = ({
  title,
  description,
  onPrimaryAction,
  onSecondaryAction
}) => {
  return (
    <div className={styles.example}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardDescription}>{description}</p>
        </div>
        
        <div className={styles.cardContent}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="example-input">
              Email Address
            </label>
            <input
              id="example-input"
              type="email"
              className={styles.input}
              placeholder="Enter your email"
            />
            <p className={styles.inputHelp}>We'll never share your email with anyone else.</p>
          </div>
        </div>
        
        <div className={styles.cardFooter}>
          <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={onSecondaryAction}>
            Cancel
          </button>
          <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={onPrimaryAction}>
            Subscribe
          </button>
        </div>
      </div>
      
      {/* Utility classes demonstration */}
      <div className="u-mt-8 u-p-4 u-bg-neutral-100 u-text-center">
        <p className="u-text-lg u-font-semibold u-text-primary-600">
          Using Design System Utilities
        </p>
        <p className="u-text-sm u-text-neutral-600 u-mt-2">
          This section uses utility classes from our design system
        </p>
      </div>
    </div>
  );
};
