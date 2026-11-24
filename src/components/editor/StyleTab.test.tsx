// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ResumeProvider, useResume } from '@context';
import { StyleTab } from './StyleTab';

function TestEditor() {
  const { resume } = useResume();
  return (
    <>
      <StyleTab />
      <output aria-label="Selected page size">{resume.pageSize}</output>
    </>
  );
}

describe('StyleTab', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('updates the resume page size from the style controls', () => {
    render(
      <ResumeProvider>
        <TestEditor />
      </ResumeProvider>
    );

    fireEvent.change(screen.getByLabelText('Page size'), { target: { value: 'Legal' } });

    expect(screen.getByLabelText('Selected page size').textContent).toBe('Legal');
  });
});
