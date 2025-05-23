"""v0_0 tables created

Revision ID: 5db65a1f15bc
Revises: 
Create Date: 2025-03-25 14:32:18.841746

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5db65a1f15bc'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('transcript_log',
    sa.Column('url', sa.String(), nullable=True),
    sa.Column('transcript', sa.Text(), nullable=True),
    sa.Column('summary', sa.Text(), nullable=True),
    sa.Column('keypoints', sa.Text(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('id', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_transcript_log_id'), 'transcript_log', ['id'], unique=True)
    op.create_index(op.f('ix_transcript_log_url'), 'transcript_log', ['url'], unique=True)
    op.create_table('user',
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('refresh_token', sa.String(), nullable=True),
    sa.Column('id', sa.String(), nullable=False),
    sa.CheckConstraint('length(email) > 0', name='email_not_empty'),
    sa.CheckConstraint('length(password) > 0', name='password_not_empty'),
    sa.CheckConstraint('length(password) > 0', name='username_not_empty'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=True)
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_index(op.f('ix_transcript_log_url'), table_name='transcript_log')
    op.drop_index(op.f('ix_transcript_log_id'), table_name='transcript_log')
    op.drop_table('transcript_log')
    # ### end Alembic commands ###
