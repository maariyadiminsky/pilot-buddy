import { render, screen } from '@common/test';
import { NoteIcon } from '@modules/session/notes';
import { NoteEnum } from '@modules/session/types';

const defaultProps = {
  bgColor: 'bg-red-500',
  iconColor: 'text-white',
  name: NoteEnum.Important,
  className: '',
  shouldIncludeName: false,
};

const renderComponent = () => render(<NoteIcon {...defaultProps} />, { shouldHaveNoWrapper: true });

describe('<NoteIcon />', () => {
  it('includes the name when shouldIncludeName is true', () => {
    renderComponent();
    const nameElement = screen.getByText(NoteEnum.Important);
    expect(nameElement).toBeInTheDocument();
  });
});
