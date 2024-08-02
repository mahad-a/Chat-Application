from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref
from datetime import datetime, timezone

Base = declarative_base()

# Association table for the many-to-many relationship between users and friends
user_friends = Table('user_friends', Base.metadata,
    Column('user_id', Integer, ForeignKey('user.user_id')),
    Column('friend_id', Integer, ForeignKey('user.user_id'))
)

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    sender = Column(String(100), nullable=False)
    timestamp = Column(DateTime, default=datetime.now(timezone.utc))

class User(Base):
    __tablename__ = 'user'
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    status = Column(Boolean, nullable=False)

    # Define the many-to-many relationship
    friends = relationship(
        'User',
        secondary=user_friends,
        primaryjoin=user_id == user_friends.c.user_id,
        secondaryjoin=user_id == user_friends.c.friend_id,
        backref=backref('friends_of', lazy='dynamic'),
        lazy='dynamic'
    )
