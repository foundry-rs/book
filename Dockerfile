FROM rust
RUN cargo install mdbook
EXPOSE 3000
COPY . /book
WORKDIR /book
ENTRYPOINT ["mdbook", "serve", "-n", "0.0.0.0"]